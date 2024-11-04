export interface fileData {
  name: string;
  type: string;
  base64: string;
}
export function fileToBase64(file: any): Promise<fileData> {
  // Convert FileList to Array for easier processing

  // Process each file to base64
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      // Get base64 string without data URL prefix
      const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
      resolve({
        name: file.name,
        type: file.type,
        base64: base64String,
      });
    };

    reader.onerror = () => {
      reject(new Error('Error reading file'));
    };

    reader.readAsDataURL(file);
  });
}
