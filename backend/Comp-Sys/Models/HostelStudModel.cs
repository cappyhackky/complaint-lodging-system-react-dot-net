namespace Comp_Sys.Models
{
    public class HostelStudModel
    {
        public string? Id { get; set; }
        public string? HostelName { get; set; }
        public int RoomNo { get; set; }
        public int WingNo { get; set; }
        public string? CompName { get; set; }
        public string? PhoneNo { get; set; }
        public string? Desc { get; set; }
        public DateTime CreatedOn { get; set; }
        public string? Status{ get; set; }
    }
}
