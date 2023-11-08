export class EventUtils {
  static readAsBase64(file: File): Promise<string> {
    const reader = new FileReader();
    const fileValue: Promise<string> = new Promise((resolve, reject) => {
      reader.addEventListener("load", () => {
        if (reader.result) {
          resolve(reader.result.toString());
        } else {
          reject(new Error("Failed to read the file."));
        }
      });

      reader.addEventListener("error", (event: ProgressEvent<FileReader>) => {
        reject(event);
      });

      reader.readAsDataURL(file);
    });

    return fileValue;
  }
}
