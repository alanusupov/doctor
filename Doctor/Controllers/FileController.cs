using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Doctor.Models;
using Doctor.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Doctor.Controllers
{
    [Authorize(Roles = "admin")]
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
        public async Task<ActionResult<string>> AddFile([FromForm] FileModel uploadedFile)
        {
            var result = await _fileService.AddFile(uploadedFile.FormFile);
            if (result == "")
                return BadRequest();
            return Ok(result);
        }
        [HttpPut]
        public async Task<ActionResult<string>> UpdateFile(string oldFilePath, IFormFile uploadedFile)
        {
            var result = await _fileService.UpdateFile(oldFilePath, uploadedFile);
            if (result == "")
                return BadRequest();
            return Ok(result);
        }

        [HttpDelete]
        public async Task<ActionResult<string>> DeleteFile(string filePath)
        {
            var result = await _fileService.DeleteFile(filePath);
            if (result == "")
                return BadRequest();
            return Ok(result);
        }
    }
}
