﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSETWebCore.Model.Cis
{

    public class ModelStructure
    {
        public string ModelName { get; set; }
        public int ModelId { get; set; }
        public List<Grouping> Groupings { get; set; } = new List<Grouping>();
    }

    public class CisQuestions
    {
        public int AssessmentId { get; set; }
        public List<Grouping> Groupings { get; set; } = new List<Grouping> { };

        public Score GroupingScore { get; set; }
    }

    public class Grouping
    {
        public string GroupType { get; set; }
        public string Description { get; set; }
        public string Abbreviation { get; set; }
        public int GroupingId { get; set; }
        public string Title { get; set; }
        public List<Grouping> Groupings { get; set; } = new List<Grouping>();
        public List<Question> Questions { get; set; } = new List<Question>();
    }

    public class Question
    {
        public int QuestionId { get; set; }
        public string QuestionType { get; set; }
        public int Sequence { get; set; }
        public string DisplayNumber { get; set; }
        public string QuestionText { get; set; }

        public string AnswerText { get; set; }
        public string AnswerMemo { get; set; }
        public string ReferenceText { get; set; }

        public int? ParentQuestionId { get; set; }
        public int? ParentOptionId { get; set; }
        public List<Option> Options { get; set; } = new List<Option>();
        public List<Question> Followups { get; set; } = new List<Question>();

    }

    public class Option
    {
        public int OptionId { get; set; }
        public string OptionType { get; set; }
        public string OptionText { get; set; }
        public int Sequence { get; set; }

        public decimal? Weight { get; set; }

        public bool Selected { get; set; }
        public int? AnswerId { get; set; }

        /// <summary>
        /// Indicates if the option also renders an input field.
        /// </summary>
        public bool HasAnswerText { get; set; }

        /// <summary>
        /// The user's answer.
        /// </summary>
        public string AnswerText { get; set; }

        public List<Question> Followups { get; set; } = new List<Question>();
    }


    public class Score
    {
        public int GroupingId { get; set; }
        public int GroupingScore { get; set; }
        public int High { get; set; }
        public int Median { get; set; }
        public int Low { get; set; }
    }


    /// <summary>
    /// Represents a node in the navigation tree.  This is created
    /// for use with the CIS model because the tree is large
    /// and not worth hard coding.  This class could be promoted
    /// to some place more general for other usage if needed.
    /// </summary>
    public class NavNode
    {
        public int? Id { get; set; }
        public string Title { get; set; }
        public int Level { get; set; }
        public bool HasChildren { get; set; } = false;
    }
}
