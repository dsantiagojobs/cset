/*
Run this script on:



(localdb)\MSSQLLocalDB.CSETWeb - This database will be modified



to synchronize it with:



sql19dev1.CSETWeb



You are recommended to back up your database before running this script



Script created by SQL Data Compare version 14.6.10.20102 from Red Gate Software Ltd at 2/1/2022 4:03:44 PM



*/

SET NUMERIC_ROUNDABORT OFF
GO
SET ANSI_PADDING, ANSI_WARNINGS, CONCAT_NULL_YIELDS_NULL, ARITHABORT, QUOTED_IDENTIFIER, ANSI_NULLS, NOCOUNT ON
GO
SET DATEFORMAT YMD
GO
SET XACT_ABORT ON
GO
SET TRANSACTION ISOLATION LEVEL Serializable
GO
BEGIN TRANSACTION



PRINT(N'Drop constraints from [dbo].[SETS]')
ALTER TABLE [dbo].[SETS] NOCHECK CONSTRAINT [FK_SETS_Sets_Category]



PRINT(N'Drop constraint FK_AVAILABLE_STANDARDS_SETS from [dbo].[AVAILABLE_STANDARDS]')
ALTER TABLE [dbo].[AVAILABLE_STANDARDS] NOCHECK CONSTRAINT [FK_AVAILABLE_STANDARDS_SETS]



PRINT(N'Drop constraint FK_CUSTOM_STANDARD_BASE_STANDARD_SETS from [dbo].[CUSTOM_STANDARD_BASE_STANDARD]')
ALTER TABLE [dbo].[CUSTOM_STANDARD_BASE_STANDARD] NOCHECK CONSTRAINT [FK_CUSTOM_STANDARD_BASE_STANDARD_SETS]



PRINT(N'Drop constraint FK_CUSTOM_STANDARD_BASE_STANDARD_SETS1 from [dbo].[CUSTOM_STANDARD_BASE_STANDARD]')
ALTER TABLE [dbo].[CUSTOM_STANDARD_BASE_STANDARD] NOCHECK CONSTRAINT [FK_CUSTOM_STANDARD_BASE_STANDARD_SETS1]



PRINT(N'Drop constraint FK_NEW_QUESTION_SETS_SETS from [dbo].[NEW_QUESTION_SETS]')
ALTER TABLE [dbo].[NEW_QUESTION_SETS] NOCHECK CONSTRAINT [FK_NEW_QUESTION_SETS_SETS]



PRINT(N'Drop constraint FK_REPORT_STANDARDS_SELECTION_SETS from [dbo].[REPORT_STANDARDS_SELECTION]')
ALTER TABLE [dbo].[REPORT_STANDARDS_SELECTION] NOCHECK CONSTRAINT [FK_REPORT_STANDARDS_SELECTION_SETS]



PRINT(N'Drop constraint FK_REQUIREMENT_QUESTIONS_SETS_SETS from [dbo].[REQUIREMENT_QUESTIONS_SETS]')
ALTER TABLE [dbo].[REQUIREMENT_QUESTIONS_SETS] NOCHECK CONSTRAINT [FK_REQUIREMENT_QUESTIONS_SETS_SETS]



PRINT(N'Drop constraint FK_QUESTION_SETS_SETS from [dbo].[REQUIREMENT_SETS]')
ALTER TABLE [dbo].[REQUIREMENT_SETS] NOCHECK CONSTRAINT [FK_QUESTION_SETS_SETS]



PRINT(N'Drop constraint FK_SECTOR_STANDARD_RECOMMENDATIONS_SETS from [dbo].[SECTOR_STANDARD_RECOMMENDATIONS]')
ALTER TABLE [dbo].[SECTOR_STANDARD_RECOMMENDATIONS] NOCHECK CONSTRAINT [FK_SECTOR_STANDARD_RECOMMENDATIONS_SETS]



PRINT(N'Drop constraint FK_SET_FILES_SETS from [dbo].[SET_FILES]')
ALTER TABLE [dbo].[SET_FILES] NOCHECK CONSTRAINT [FK_SET_FILES_SETS]



PRINT(N'Drop constraint FK_STANDARD_CATEGORY_SEQUENCE_SETS from [dbo].[STANDARD_CATEGORY_SEQUENCE]')
ALTER TABLE [dbo].[STANDARD_CATEGORY_SEQUENCE] NOCHECK CONSTRAINT [FK_STANDARD_CATEGORY_SEQUENCE_SETS]



PRINT(N'Drop constraint FK_Standard_Source_File_SETS from [dbo].[STANDARD_SOURCE_FILE]')
ALTER TABLE [dbo].[STANDARD_SOURCE_FILE] NOCHECK CONSTRAINT [FK_Standard_Source_File_SETS]



PRINT(N'Drop constraint FK_UNIVERSAL_SUB_CATEGORY_HEADINGS_SETS from [dbo].[UNIVERSAL_SUB_CATEGORY_HEADINGS]')
ALTER TABLE [dbo].[UNIVERSAL_SUB_CATEGORY_HEADINGS] NOCHECK CONSTRAINT [FK_UNIVERSAL_SUB_CATEGORY_HEADINGS_SETS]



PRINT(N'Update rows in [dbo].[SETS]')
UPDATE [dbo].[SETS] SET [IsEncryptedModule]=0 WHERE [Set_Name] = 'FAA'
UPDATE [dbo].[SETS] SET [IsEncryptedModuleOpen]=0 WHERE [Set_Name] = 'FAA_PED_V2'
PRINT(N'Operation applied to 2 rows out of 2')



PRINT(N'Add constraints to [dbo].[SETS]')
ALTER TABLE [dbo].[SETS] WITH CHECK CHECK CONSTRAINT [FK_SETS_Sets_Category]
ALTER TABLE [dbo].[AVAILABLE_STANDARDS] WITH CHECK CHECK CONSTRAINT [FK_AVAILABLE_STANDARDS_SETS]
ALTER TABLE [dbo].[CUSTOM_STANDARD_BASE_STANDARD] CHECK CONSTRAINT [FK_CUSTOM_STANDARD_BASE_STANDARD_SETS]
ALTER TABLE [dbo].[CUSTOM_STANDARD_BASE_STANDARD] CHECK CONSTRAINT [FK_CUSTOM_STANDARD_BASE_STANDARD_SETS1]
ALTER TABLE [dbo].[NEW_QUESTION_SETS] CHECK CONSTRAINT [FK_NEW_QUESTION_SETS_SETS]
ALTER TABLE [dbo].[REPORT_STANDARDS_SELECTION] WITH CHECK CHECK CONSTRAINT [FK_REPORT_STANDARDS_SELECTION_SETS]
ALTER TABLE [dbo].[REQUIREMENT_QUESTIONS_SETS] WITH CHECK CHECK CONSTRAINT [FK_REQUIREMENT_QUESTIONS_SETS_SETS]
ALTER TABLE [dbo].[REQUIREMENT_SETS] CHECK CONSTRAINT [FK_QUESTION_SETS_SETS]
ALTER TABLE [dbo].[SECTOR_STANDARD_RECOMMENDATIONS] CHECK CONSTRAINT [FK_SECTOR_STANDARD_RECOMMENDATIONS_SETS]
ALTER TABLE [dbo].[SET_FILES] WITH CHECK CHECK CONSTRAINT [FK_SET_FILES_SETS]
ALTER TABLE [dbo].[STANDARD_CATEGORY_SEQUENCE] CHECK CONSTRAINT [FK_STANDARD_CATEGORY_SEQUENCE_SETS]
ALTER TABLE [dbo].[STANDARD_SOURCE_FILE] CHECK CONSTRAINT [FK_Standard_Source_File_SETS]
ALTER TABLE [dbo].[UNIVERSAL_SUB_CATEGORY_HEADINGS] WITH CHECK CHECK CONSTRAINT [FK_UNIVERSAL_SUB_CATEGORY_HEADINGS_SETS]
COMMIT TRANSACTION
GO