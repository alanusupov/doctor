using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Doctor.Service
{
    public class FileService
    {   
        IWebHostEnvironment _appEnvironment;
        string PathImg = "/img/";
        public FileService(IWebHostEnvironment appEnvironment)
        {
            _appEnvironment = appEnvironment;
        }

        public async Task<string> AddFile(IFormFile uploadedFile)
        {
            var path = "";
            if (uploadedFile != null)
            {
                path = PathImg + Guid.NewGuid() + "." + uploadedFile.FileName.Split('.')[1];
                using (var fileStream = new FileStream(_appEnvironment.WebRootPath + path, FileMode.Create))
                {
                    await uploadedFile.CopyToAsync(fileStream);
                }
            }

            return path;
        }
        public async Task<string> UpdateFile(string oldFilePath, IFormFile uploadedFile)
        {
            var path = "";
            if (uploadedFile != null)
            {
                try
                {
                    if (File.Exists(Path.Combine(_appEnvironment.WebRootPath + PathImg, oldFilePath)))
                    {
                        File.Delete(Path.Combine(_appEnvironment.WebRootPath + PathImg, oldFilePath));
                        path = await AddFile(uploadedFile);
                        Console.WriteLine("File deleted.");
                    }
                    else Console.WriteLine("File not found");
                }
                catch (IOException ioExp)
                {
                    Console.WriteLine(ioExp.Message);
                }
            }
            return path;
        }
        public async Task<string> DeleteFile(string filePath)
        {
            var result = "";
            try
            {
                if (File.Exists(Path.Combine(_appEnvironment.WebRootPath + PathImg, filePath)))
                {  
                    File.Delete(Path.Combine(_appEnvironment.WebRootPath + PathImg, filePath));
                    result = "True";
                }
                else result = "False";
            }
            catch (IOException ioExp)
            {
                result = ioExp.Message;
            }
            
            return result;
        }
    }
}
