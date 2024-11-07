public class Walker_Cities
{
    public int WalkerCityId { get; set; }
    public int WalkerId { get; set; }
    public int CityId { get; set; }
    public Walker Walker { get; set; }
    public City City { get; set; }
}