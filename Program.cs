

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

List<Walker_Cities> walkerCities = new List<Walker_Cities>
{
    new Walker_Cities() { WalkerCityId = 1, WalkerId = 1, CityId = 1 },
    new Walker_Cities() { WalkerCityId = 2, WalkerId = 1, CityId = 2 },
    new Walker_Cities() { WalkerCityId = 3, WalkerId = 2, CityId = 2 },
    new Walker_Cities() { WalkerCityId = 4, WalkerId = 3, CityId = 3 },
    new Walker_Cities() { WalkerCityId = 5, WalkerId = 4, CityId = 1 }
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

app.MapGet("/api/cities", () => 
{
    return cities.Select(c => new { c.Id, c.Name }).ToList();
});

app.MapPost("/api/dogs", (DogDTO newDog) =>
{
    int newId = dogs.Max(d => d.Id) + 1;
    var dog = new Dog
    {
        Id = newId,
        Name = newDog.Name,
        CityId = newDog.CityId,
        WalkerId = null
    };
    dogs.Add(dog);
    return Results.Created($"/api/dogs/{newId}", dog);
});

app.MapGet("/api/walkers", (int? cityId) =>
{
    List<Walker_CitiesDTO> results = walkerCities
        .Where(wc => cityId == null || wc.CityId == cityId)
        .Select(wc => new Walker_CitiesDTO
        {
            WalkerId = wc.WalkerId,
            WalkerName = walkers.FirstOrDefault(w => w.Id == wc.WalkerId)?.Name ?? "Unknown",
            CityId = wc.CityId,
            CityName = cities.FirstOrDefault(c => c.Id == wc.CityId)?.Name ?? "Unknown"
        })
        .ToList();

    return results;
});



app.Run();
