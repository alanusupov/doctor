using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Doctor.Service;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Doctor.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : ControllerBase
    {
        FileService _fileService;
        public FileController(FileService fileService)
        {
            _fileService = fileService;
        }
        [HttpPost]
        public async Task<string> AddFile(IFormFile uploadedFile)
        {
            var path = await _fileService.AddFile(uploadedFile);
            return path;
        }
        [HttpPut]
        public async Task<string> UpdateFile(string oldFilePath, IFormFile uploadedFile)
        {
            var path = await _fileService.UpdateFile(oldFilePath, uploadedFile);
            return path;
        }

        [HttpDelete]
        public async Task<string> DeleteFile(string filePath)
        {
            var path = await _fileService.DeleteFile(filePath);
            return path;
        }
    }
}
