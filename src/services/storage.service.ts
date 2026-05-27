import { createClient } from "@/lib/supabase/client";

export const storageService = {
  /**
   * Upload an image to a Supabase Storage bucket and return the public URL.
   * @param bucket The name of the storage bucket (e.g. "promos")
   * @param file The File object to upload
   * @returns The public URL of the uploaded image
   */
  uploadImage: async (bucket: string, file: File): Promise<string> => {
    const supabase = createClient();
    
    // Generate a unique filename to prevent collisions
    const fileExt = file.name.split(".").pop();
    const uniqueId = Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
    const fileName = `${uniqueId}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
    return data.publicUrl;
  },

  /**
   * Delete an image from a Supabase Storage bucket by its public URL.
   */
  deleteImageByUrl: async (bucket: string, publicUrl: string): Promise<boolean> => {
    const supabase = createClient();
    
    // Extract the exact path inside the bucket from the URL string
    if (!publicUrl) return false;
    const urlParts = publicUrl.split(`/${bucket}/`);
    if (urlParts.length !== 2) return false;
    
    const filePath = urlParts[1];
    if (!filePath) return false;

    const { error } = await supabase.storage.from(bucket).remove([filePath]);
    if (error) {
      console.error("Storage delete error:", error);
      return false;
    }
    
    return true;
  }
};
