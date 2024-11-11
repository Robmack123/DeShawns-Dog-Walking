export const getGreeting = async () => {
  const res = await fetch("/api/hello");
  return res.json();
};
export const getDogs = async () => {
  const res = await fetch("/api/dogs");
  return res.json();
};

export const getCities = async () => {
  const res = await fetch("/api/cities");
  return res.json();
};

export const addDog = async (dog) => {
  const res = await fetch("/api/dogs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dog),
  }).catch(() => console.log("Failed to add dog"));
};

export const getWalkersByCity = async (cityId = "") => {
  const res = await fetch(`/api/walkers${cityId ? `?cityId=${cityId}` : ""}`);
  return res.json();
};

export const getAvailableDogsForWalker = async (walkerId) => {
  const res = await fetch(`/api/availableDogs?walkerId=${walkerId}`);
  if (!res.ok) throw new Error("Failed to fetch available dogs for walker");
  return res.json();
};

export const assignWalkerToDog = async (walkerId, dogId) => {
  const res = await fetch(
    `/api/assignWalker?walkerId=${walkerId}&dogId=${dogId}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    }
  );
  if (!res.ok) throw new Error("Failed to assign walker to dog");
  return res.json();
};

export const getWalkerById = async (walkerId) => {
  const res = await fetch(`/api/walkers/${walkerId}`);
  if (!res.ok) throw new Error("Failed to fetch walker by ID");
  return res.json();
};

export const addCity = async (name) => {
  const res = await fetch("/api/cities", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) throw new Error("Failed to add city");
  return res.json();
};
