USE [comp_sys]
GO
/****** Object:  Table [dbo].[admin_tbl]    Script Date: 07-02-2024 03:44:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[admin_tbl](
	[adm_id] [varchar](50) NULL,
	[adm_name] [varchar](100) NULL,
	[adm_type] [varchar](2) NULL,
	[adm_email] [varchar](100) NULL,
	[adm_dsgn] [varchar](50) NULL,
	[adm_phno] [varchar](10) NULL,
	[adm_pass] [varchar](255) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[house_comp]    Script Date: 07-02-2024 03:44:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[house_comp](
	[hscmp_id] [varchar](50) NOT NULL,
	[hscmp_typ] [nchar](10) NOT NULL,
	[hscmp_hsno] [varchar](50) NOT NULL,
	[hscmp_cmpnm] [varchar](50) NOT NULL,
	[hscmp_svr] [varchar](1) NOT NULL,
	[hscmp_phno] [varchar](10) NOT NULL,
	[hscmp_desc] [varchar](255) NOT NULL,
	[hscmp_crdt] [date] NOT NULL,
	[hscmp_stat] [varchar](1) NULL,
 CONSTRAINT [PK_house_comp] PRIMARY KEY CLUSTERED 
(
	[hscmp_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[hstmn_comp]    Script Date: 07-02-2024 03:44:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[hstmn_comp](
	[hstmn_id] [varchar](50) NOT NULL,
	[hstmn_typ] [varchar](1) NOT NULL,
	[hstmn_hstnm] [varchar](50) NOT NULL,
	[hstmn_cmpnm] [varchar](50) NOT NULL,
	[hstmn_svr] [varchar](1) NOT NULL,
	[hstmn_phno] [varchar](10) NOT NULL,
	[hstmn_desc] [varchar](255) NOT NULL,
	[hstmn_crdt] [date] NOT NULL,
	[hstmn_stat] [varchar](1) NULL,
 CONSTRAINT [PK__hstmn_co__425A1EAF8499767D] PRIMARY KEY CLUSTERED 
(
	[hstmn_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[hstst_comp]    Script Date: 07-02-2024 03:44:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[hstst_comp](
	[hstst_id] [varchar](50) NOT NULL,
	[hstst_hstnm] [varchar](50) NOT NULL,
	[hstst_rmno] [int] NOT NULL,
	[hstst_wgno] [int] NOT NULL,
	[hstst_cmpnm] [varchar](50) NOT NULL,
	[hstst_phno] [varchar](10) NOT NULL,
	[hstst_desc] [varchar](255) NOT NULL,
	[hstst_crdt] [date] NOT NULL,
	[hstst_stat] [varchar](1) NULL,
 CONSTRAINT [PK__hstst_co__BB1E5EFC1DD80D11] PRIMARY KEY CLUSTERED 
(
	[hstst_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  StoredProcedure [dbo].[sp_GetHouseComp]    Script Date: 07-02-2024 03:44:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[sp_GetHouseComp] As
BEGIN
Select *
from house_comp;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_GetHouseCompById]    Script Date: 07-02-2024 03:44:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[sp_GetHouseCompById]
@complaintId varchar(50)
as
begin
Select *
from house_comp 
where hscmp_id = @complaintId;
end
GO
/****** Object:  StoredProcedure [dbo].[sp_GetManComp]    Script Date: 07-02-2024 03:44:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_GetManComp] As
BEGIN
Select *
from hstmn_comp;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_GetManCompById]    Script Date: 07-02-2024 03:44:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create procedure [dbo].[sp_GetManCompById]
@complaintId varchar(50)
as
begin
Select *
from hstmn_comp 
where hstmn_id = @complaintId;
end
GO
/****** Object:  StoredProcedure [dbo].[sp_GetStudComp]    Script Date: 07-02-2024 03:44:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_GetStudComp] As
BEGIN
Select *
from hstst_comp;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_GetStudCompById]    Script Date: 07-02-2024 03:44:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create procedure [dbo].[sp_GetStudCompById]
@complaintId varchar(50)
as
begin
Select *
from hstst_comp 
where hstst_id = @complaintId;
end
GO
/****** Object:  StoredProcedure [dbo].[sp_registerJE]    Script Date: 07-02-2024 03:44:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_registerJE]
    @name VARCHAR(100),
    @type VARCHAR(2),
    @email VARCHAR(100),
    @designation VARCHAR(3),
    @phno VARCHAR(10),
    @password VARCHAR(255),
	@adm_id varchar(50) OUTPUT
AS
BEGIN
    DECLARE @column_id VARCHAR(20);

    -- Generate the unique column_id
    DECLARE @maxId INT;
    SELECT @maxId = ISNULL(MAX(CAST(SUBSTRING(adm_id, LEN(adm_id)-3, 5) AS INT)), 0) + 1
    FROM admin_tbl;

    SET @column_id = 'ADMCLS' + RIGHT('0000' + CAST(@maxId AS VARCHAR(4)), 4);

    insert into admin_tbl (adm_id,adm_name, adm_type, adm_email, adm_dsgn, adm_phno, adm_pass)
    values(@column_id, @name, @type, @email, @designation, @phno, @password);
	SET @adm_id = @column_id;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_setHouseComp]    Script Date: 07-02-2024 03:44:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_setHouseComp]
    @type VARCHAR(1),
    @houseno NCHAR(50),
    @cmpnm VARCHAR(50),
    @severity VARCHAR(1),
    @phno VARCHAR(10),
    @desc VARCHAR(255),
	@complaintNumber varchar(20) OUTPUT
AS
BEGIN
    DECLARE @column_id VARCHAR(20);

    -- Generate the unique column_id
    DECLARE @maxId INT;
    SELECT @maxId = ISNULL(MAX(CAST(SUBSTRING(hscmp_id, LEN(hscmp_id)-3, 5) AS INT)), 0) + 1
    FROM house_comp;

    SET @column_id = 'CHO' + CAST(YEAR(GETDATE()) AS VARCHAR(4)) + RIGHT('0000' + CAST(@maxId AS VARCHAR(4)), 4);

    insert into house_comp (hscmp_id, hscmp_typ, hscmp_hsno, hscmp_cmpnm, hscmp_svr, hscmp_phno, hscmp_desc, hscmp_crdt, hscmp_stat)
    values(@column_id, @type, @houseno, @cmpnm, @severity, @phno, @desc, GETDATE(), 'p');
	SET @complaintNumber = @column_id;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_setHstlManComp]    Script Date: 07-02-2024 03:44:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE procedure [dbo].[sp_setHstlManComp]
@type varchar(1),
@hstlnm varchar(50),
@cmpnm varchar(50),
@severity varchar(1),
@phno varchar(10),
@desc varchar(255),
@complaintNumber varchar(20) OUTPUT
as
begin
DECLARE @column_id VARCHAR(20);

    -- Generate the unique column_id
    DECLARE @maxId INT;
    SELECT @maxId = ISNULL(MAX(CAST(SUBSTRING(hstmn_id, LEN(hstmn_id)-3, 5) AS INT)), 0) + 1
    FROM hstmn_comp;

    SET @column_id = 'CHM' + CAST(YEAR(GETDATE()) AS VARCHAR(4)) + RIGHT('0000' + CAST(@maxId AS VARCHAR(4)), 4);
	insert into hstmn_comp (hstmn_id,hstmn_typ, hstmn_hstnm, hstmn_cmpnm, hstmn_svr, hstmn_phno, hstmn_desc ,hstmn_crdt)
	values(@column_id,@type, @hstlnm, @cmpnm, @severity, @phno, @desc, GETDATE())
	SET @complaintNumber = @column_id;
end
GO
/****** Object:  StoredProcedure [dbo].[sp_setHstlStudComp]    Script Date: 07-02-2024 03:44:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE procedure [dbo].[sp_setHstlStudComp]
@hstlnm varchar(50),
@rmno int,
@wgno int,
@cmpnm varchar(50),
@phno varchar(10),
@desc varchar(255),
@complaintNumber varchar(20) OUTPUT
as
begin
DECLARE @column_id VARCHAR(20);

    -- Generate the unique column_id
    DECLARE @maxId INT;
    SELECT @maxId = ISNULL(MAX(CAST(SUBSTRING(hstst_id, LEN(hstst_id)-3, 5) AS INT)), 0) + 1
    FROM hstst_comp;

    SET @column_id = 'CHS' + CAST(YEAR(GETDATE()) AS VARCHAR(4)) + RIGHT('0000' + CAST(@maxId AS VARCHAR(4)), 4);
	insert into hstst_comp (hstst_id,hstst_hstnm, hstst_rmno, hstst_wgno, hstst_cmpnm, hstst_phno, hstst_desc ,hstst_crdt, hstst_stat)
	values(@column_id, @hstlnm, @rmno, @wgno, @cmpnm, @phno, @desc, GETDATE(), 'p')
	SET @complaintNumber = @column_id;
end
GO
/****** Object:  StoredProcedure [dbo].[sp_updateHostelMan]    Script Date: 07-02-2024 03:44:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_updateHostelMan]
	@status varchar(1),
	@id varchar(50)
AS 
BEGIN
	UPDATE hstmn_comp SET hstmn_stat = @status where hstmn_id = @id;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_updateHostelStud]    Script Date: 07-02-2024 03:44:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_updateHostelStud]
	@status varchar(1),
	@id varchar(50)
AS 
BEGIN
	UPDATE hstst_comp SET hstst_stat = @status where hstst_id = @id;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_updateHouse]    Script Date: 07-02-2024 03:44:35 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_updateHouse]
	@status varchar(1),
	@id varchar(50)
AS 
BEGIN
	UPDATE house_comp SET hscmp_stat = @status where hscmp_id = @id;
END
GO
