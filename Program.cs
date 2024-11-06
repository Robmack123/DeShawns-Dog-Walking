

List<Dog> dogs = new List<Dog>
{
    new Dog()
    {
        Id = 1,
        Name = "Buddy",
        WalkerId = 1,
        CityId = 1
    },
    new Dog()
    {
        Id = 2,
        Name = "Max",
        WalkerId = 2,
        CityId = 2
    },
    new Dog()
    {
        Id = 3,
        Name = "Bella",
        WalkerId = null,  // No walker assigned yet
        CityId = 1
    },
    new Dog()
    {
        Id = 4,
        Name = "Charlie",
        WalkerId = 3,
        CityId = 3
    }
};

List<Walker> walkers = new List<Walker>
{
    new Walker()
    {
        Id = 1,
        Name = "Sarah"
    },
    new Walker()
    {
        Id = 2,
        Name = "Jake"
    },
    new Walker()
    {
        Id = 3,
        Name = "Lily"
    },
    new Walker()
    {
        Id = 4,
        Name = "Tom"
    }
};

List<City> cities = new List<City>
{
    new City()
    {
        Id = 1,
        Name = "Springfield"
    },
    new City()
    {
        Id = 2,
        Name = "Riverdale"
    },
    new City()
    {
        Id = 3,
        Name = "Sunnyvale"
    },
    new City()
    {
        Id = 4,
        Name = "Hill Valley"
    }
};

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapGet("/api/hello", () =>
{
    return new { Message = "Welcome to DeShawn's Dog Walking" };
});

app.MapGet("/api/dogs", () =>
{
    return dogs.Select(d => new DogDTO
    {
        Id = d.Id,
        Name = d.Name,
        CityId = d.CityId,
        CityName = cities.FirstOrDefault(c => c.Id == d.CityId)?.Name,
        WalkerId = d.WalkerId ?? 0,
        WalkerName = d.WalkerId != null
            ? walkers.FirstOrDefault(w => w.Id == d.WalkerId)?.Name
            : "No walker assigned"
    }).ToList();
});
app.Run();
