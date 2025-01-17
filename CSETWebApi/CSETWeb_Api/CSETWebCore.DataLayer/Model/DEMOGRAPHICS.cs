﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace CSETWebCore.DataLayer.Model
{
    /// <summary>
    /// A collection of DEMOGRAPHICS records
    /// </summary>
    public partial class DEMOGRAPHICS
    {
        public DEMOGRAPHICS()
        {
            DOCUMENT_FILE = new HashSet<DOCUMENT_FILE>();
        }

        [Key]
        public int Assessment_Id { get; set; }
        public int? SectorId { get; set; }
        public int? IndustryId { get; set; }
        [StringLength(50)]
        public string Size { get; set; }
        [StringLength(50)]
        public string AssetValue { get; set; }
        public bool NeedsPrivacy { get; set; }
        public bool NeedsSupplyChain { get; set; }
        public bool NeedsICS { get; set; }
        [StringLength(150)]
        public string OrganizationName { get; set; }
        [StringLength(150)]
        public string Agency { get; set; }
        public int? OrganizationType { get; set; }
        public int? Facilitator { get; set; }
        public int? PointOfContact { get; set; }
        public bool? IsScoped { get; set; }
        [StringLength(100)]
        public string CriticalService { get; set; }

        [ForeignKey(nameof(Assessment_Id))]
        [InverseProperty(nameof(ASSESSMENTS.DEMOGRAPHICS))]
        public virtual ASSESSMENTS Assessment { get; set; }
        [ForeignKey(nameof(AssetValue))]
        [InverseProperty(nameof(DEMOGRAPHICS_ASSET_VALUES.DEMOGRAPHICS))]
        public virtual DEMOGRAPHICS_ASSET_VALUES AssetValueNavigation { get; set; }
        [ForeignKey(nameof(Facilitator))]
        [InverseProperty(nameof(ASSESSMENT_CONTACTS.DEMOGRAPHICSFacilitatorNavigation))]
        public virtual ASSESSMENT_CONTACTS FacilitatorNavigation { get; set; }
        public virtual SECTOR_INDUSTRY Industry { get; set; }
        [ForeignKey(nameof(OrganizationType))]
        [InverseProperty(nameof(DEMOGRAPHICS_ORGANIZATION_TYPE.DEMOGRAPHICS))]
        public virtual DEMOGRAPHICS_ORGANIZATION_TYPE OrganizationTypeNavigation { get; set; }
        [ForeignKey(nameof(PointOfContact))]
        [InverseProperty(nameof(ASSESSMENT_CONTACTS.DEMOGRAPHICSPointOfContactNavigation))]
        public virtual ASSESSMENT_CONTACTS PointOfContactNavigation { get; set; }
        [ForeignKey(nameof(SectorId))]
        [InverseProperty(nameof(SECTOR.DEMOGRAPHICS))]
        public virtual SECTOR Sector { get; set; }
        [ForeignKey(nameof(Size))]
        [InverseProperty(nameof(DEMOGRAPHICS_SIZE.DEMOGRAPHICS))]
        public virtual DEMOGRAPHICS_SIZE SizeNavigation { get; set; }
        [InverseProperty("AssessmentNavigation")]
        public virtual ICollection<DOCUMENT_FILE> DOCUMENT_FILE { get; set; }
    }
}