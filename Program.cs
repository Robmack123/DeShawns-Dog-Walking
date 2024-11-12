

List<Dog> dogs = new List<Dog>
{
    new Dog()
    {
        Id = 1,
        Name = "Buddy",
        WalkerId = null,
        CityId = 1
    },
    new Dog()
    {
        Id = 2,
        Name = "Max",
        WalkerId = null,
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
        WalkerId = null,
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

app.MapGet("/api/walkers", () =>
{
    var walkerList = walkers.Select(w => new WalkerDTO
    {
        Id = w.Id,
        Name = w.Name,
        CityIds = walkerCities
            .Where(wc => wc.WalkerId == w.Id)
            .Select(wc => wc.CityId)
            .ToList(),
        CityNames = walkerCities
            .Where(wc => wc.WalkerId == w.Id)
            .Select(wc => cities.FirstOrDefault(c => c.Id == wc.CityId)?.Name)
            .Where(name => !string.IsNullOrEmpty(name))
            .ToList()
    }).ToList();

    return Results.Ok(walkerList);
});


app.MapGet("/api/availableDogs", (int walkerId) =>
{
    List<int> walkerCityIds = walkerCities
        .Where(wc => wc.WalkerId == walkerId)
        .Select(wc => wc.CityId)
        .ToList();

    List<DogDTO> availableDogs = dogs
        .Where(d => walkerCityIds.Contains(d.CityId) && d.WalkerId == null)
        .Select(d => new DogDTO
        {
           Id = d.Id,
            Name = d.Name,
            CityId = d.CityId,
            CityName = cities.FirstOrDefault(c => c.Id == d.CityId)?.Name,
            WalkerId = d.WalkerId
        })
        .ToList();
    return availableDogs;
});

app.MapPut("/api/assignWalker", (int walkerId, int dogId) =>
{
   
    Dog dog = dogs.FirstOrDefault(d => d.Id == dogId);
    if (dog == null)
    {
        return Results.NotFound("Dog not found");
    }

    
    dog.WalkerId = walkerId;

    
    return Results.Ok(new DogDTO
    {
        Id = dog.Id,
        Name = dog.Name,
        CityId = dog.CityId,
        CityName = cities.FirstOrDefault(c => c.Id == dog.CityId)?.Name,
        WalkerId = dog.WalkerId,
        WalkerName = walkers.FirstOrDefault(w => w.Id == walkerId)?.Name
    });
});


app.MapGet("/api/walkers/{walkerId}", (int walkerId) =>
{
    var walker = walkers.FirstOrDefault(w => w.Id == walkerId);
    if (walker == null)
    {
        return Results.NotFound("Walker not found");
    }

    return Results.Ok(new
    {
        Id = walker.Id,
        Name = walker.Name
    });
});

app.MapPost("/api/cities", (CityDTO cityDTO) =>
{
    int newId = cities.Any() ? cities.Max(c => c.Id) + 1 : 1;
    var newCity = new City
    {
        Id = newId,
        Name = cityDTO.Name
    };
    cities.Add(newCity);

   
    var cityResponse = new CityDTO
    {
        Id = newCity.Id,
        Name = newCity.Name 
    };

    return Results.Created($"/api/cities/{newId}", cityDTO); 
});

app.MapGet("/api/walkers/{walkerId}/details", (int walkerId) =>
{
   
    var walker = walkers.FirstOrDefault(w => w.Id == walkerId);
    if (walker == null)
    {
        return Results.NotFound("Walker not found");
    }

  
    var cityIds = walkerCities.Where(wc => wc.WalkerId == walkerId)
                               .Select(wc => wc.CityId)
                               .ToList();

    var cityNames = cityIds.Select(cityId => cities.FirstOrDefault(c => c.Id == cityId)?.Name)
                           .Where(name => !string.IsNullOrEmpty(name)) 
                           .ToList();

    var walkerDTO = new WalkerDTO
    {
        Id = walker.Id,
        Name = walker.Name,
        CityIds = cityIds,
        CityNames = cityNames
    };

    return Results.Ok(walkerDTO);
});



app.MapPut("/api/walkers/{walkerId}", (int walkerId, WalkerDTO updatedWalker) =>
{
    Walker walker = walkers.FirstOrDefault(w => w.Id == walkerId);
    if (walker == null)
    {
        return Results.NotFound("Walker not found");
    }


    walker.Name = updatedWalker.Name;
    walkerCities.RemoveAll(wc => wc.WalkerId == walkerId); 

    
    foreach (var cityId in updatedWalker.CityIds)
    {
        walkerCities.Add(new Walker_Cities
        {
            WalkerId = walkerId,
            CityId = cityId,
            WalkerCityId = walkerCities.Count + 1 
        });
    }

    return Results.Ok(new { Message = "Walker updated successfully" });
});

app.MapDelete("/api/dogs/{dogId}", (int dogId) =>
{
    Dog dog = dogs.FirstOrDefault(d => d.Id == dogId);
    if (dog == null)
    {
        return Results.NotFound("Dog not found");
    }

    dogs.Remove(dog);
    return Results.Ok(new { Message = "Dog deleted successfully"});
});

app.MapDelete("/api/walkers/{walkerId}", (int walkerId) =>
{
    var walker = walkers.FirstOrDefault(w => w.Id == walkerId);
    if (walker == null)
    {
        return Results.NotFound("Walker not found");
    }

    walkers.Remove(walker);

    dogs.Where(d => d.WalkerId == walkerId)
        .ToList()
        .ForEach(d => d.WalkerId = null);

    walkerCities.RemoveAll(wc => wc.WalkerId == walkerId);

    return Results.Ok(new { Message = "Walker deleted successfully" });
});

app.Run();
