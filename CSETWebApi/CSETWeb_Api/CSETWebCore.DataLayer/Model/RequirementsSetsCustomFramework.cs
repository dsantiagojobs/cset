﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CSETWebCore.DataLayer
{
    public partial class RequirementsSetsCustomFramework
    {
        public int Requirement_Id { get; set; }
        [Required]
        [StringLength(50)]
        public string Set_Name { get; set; }
        public int? Question_Set_Id { get; set; }
        public int Requirement_Sequence { get; set; }
        public int? Assessment_Id { get; set; }
    }
}