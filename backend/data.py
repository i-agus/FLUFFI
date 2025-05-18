from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db = client["pet_adoption_system"]

# Clear old data (optional)
db["shelters"].delete_many({})
db["pets"].delete_many({})
db["applications"].delete_many({})

# Insert shelters
shelters = db["shelters"]
shelter_id1 = shelters.insert_one({
    "name": "Happy Paws Shelter",
    "email": "contact@happypaws.com",
    "phone": "123-456-7890",
    "address": "123 Bark Lane, Paw City",
    "description": "A loving home for pets waiting for adoption.",
    "image": "/images/shelters/happy_paws.jpg"
}).inserted_id

shelter_id2 = shelters.insert_one({
    "name": "Whiskers Haven",
    "email": "info@whiskershaven.org",
    "phone": "555-123-4567",
    "address": "456 Meow Street, Catville",
    "description": "Specializing in cat and kitten rescue and adoption.",
    "image": "/images/shelters/whiskers_haven.jpg"
}).inserted_id

shelter_id3 = shelters.insert_one({
    "name": "Forever Friends Animal Sanctuary",
    "email": "adopt@foreverfriends.net",
    "phone": "888-765-4321",
    "address": "789 Rescue Road, Petropolis",
    "description": "Dedicated to finding forever homes for all types of animals.",
    "image": "/images/shelters/forever_friends.jpeg"
}).inserted_id

shelter_id4 = shelters.insert_one({
    "name": "Little Paws Rescue",
    "email": "help@littlepaws.com",
    "phone": "222-333-4444",
    "address": "101 Small Avenue, Tiny Town",
    "description": "Focused on small breed dogs and puppies finding their forever homes.",
    "image": "/images/shelters/little_paws.jpg"
}).inserted_id

shelter_id5 = shelters.insert_one({
    "name": "Exotic Haven",
    "email": "exotic@havenshelter.org",
    "phone": "777-888-9999",
    "address": "202 Unique Boulevard, Exotica",
    "description": "Specializing in exotic pets and unusual animal companions.",
    "image": "/images/shelters/exotic_haven.jpeg"
}).inserted_id

# Insert admin user
db["admins"].delete_many({})
db["admins"].insert_one({
    "username": "admin",
    "password": "admin123",  # In production, hash this!
    "email": "admin@furever.com"
})

# Insert pets
pets = db["pets"]

# Original pets
pets.insert_one({
    "name": "Max",
    "age": 3,
    "breed": "Labrador",
    "type": "Dog",
    "gender": "Male",
    "status": "Available",
    "description": "Friendly and energetic.",
    "image": "/images/pets/max.jpg",
    "shelterId": shelter_id1
})

pets.insert_one({
    "name": "Luna",
    "age": 2,
    "breed": "Persian Cat",
    "type": "Cat",
    "gender": "Female",
    "status": "Available",
    "description": "Loves cuddles and naps.",
    "image": "/images/pets/luna.jpg",
    "shelterId": shelter_id1
})

pets.insert_one({
    "name": "Bugs",
    "age": 2,
    "breed": "White Bunny",
    "type": "Rabbit",
    "gender": "Female",
    "status": "Available",
    "description": "Loves to hop around and play.",
    "image": "/images/pets/bugs.jpeg",
    "shelterId": shelter_id1
})

# Additional pets for Happy Paws Shelter
pets.insert_one({
    "name": "Rocky",
    "age": 5,
    "breed": "German Shepherd",
    "type": "Dog",
    "gender": "Male",
    "status": "Available",
    "description": "Loyal and protective companion.",
    "image": "/images/pets/rocky.jpeg",
    "shelterId": shelter_id1
})

pets.insert_one({
    "name": "Bella",
    "age": 1,
    "breed": "Beagle",
    "type": "Dog",
    "gender": "Female",
    "status": "Available",
    "description": "Playful puppy with lots of energy.",
    "image": "/images/pets/bella.jpeg",
    "shelterId": shelter_id1
})

# Pets for Whiskers Haven
pets.insert_one({
    "name": "Oliver",
    "age": 3,
    "breed": "Siamese",
    "type": "Cat",
    "gender": "Male",
    "status": "Available",
    "description": "Vocal and affectionate feline.",
    "image": "/images/pets/oliver.jpeg",
    "shelterId": shelter_id2
})

pets.insert_one({
    "name": "Cleo",
    "age": 4,
    "breed": "Maine Coon",
    "type": "Cat",
    "gender": "Female",
    "status": "Available",
    "description": "Gentle giant with a fluffy coat.",
    "image": "/images/pets/cleo.jpeg",
    "shelterId": shelter_id2
})

pets.insert_one({
    "name": "Milo",
    "age": 2,
    "breed": "Tabby",
    "type": "Cat",
    "gender": "Male",
    "status": "Available",
    "description": "Curious and playful tabby cat.",
    "image": "/images/pets/milo.jpeg",
    "shelterId": shelter_id2
})

pets.insert_one({
    "name": "Sophie",
    "age": 1,
    "breed": "Calico",
    "type": "Cat",
    "gender": "Female",
    "status": "Available",
    "description": "Sweet kitten with beautiful markings.",
    "image": "/images/pets/sophie.jpeg",
    "shelterId": shelter_id2
})

pets.insert_one({
    "name": "Whiskers",
    "age": 5,
    "breed": "Russian Blue",
    "type": "Cat",
    "gender": "Male",
    "status": "Available",
    "description": "Calm and dignified house cat.",
    "image": "/images/pets/whiskers.jpeg",
    "shelterId": shelter_id2
})

# Pets for Forever Friends Animal Sanctuary
pets.insert_one({
    "name": "Charlie",
    "age": 6,
    "breed": "Golden Retriever",
    "type": "Dog",
    "gender": "Male",
    "status": "Available",
    "description": "Friendly family dog who loves children.",
    "image": "/images/pets/charlie.jpeg",
    "shelterId": shelter_id3
})

pets.insert_one({
    "name": "Daisy",
    "age": 4,
    "breed": "Border Collie",
    "type": "Dog",
    "gender": "Female",
    "status": "Available",
    "description": "Intelligent and energetic working dog.",
    "image": "/images/pets/daisy.jpeg",
    "shelterId": shelter_id3
})

pets.insert_one({
    "name": "Mittens",
    "age": 2,
    "breed": "Domestic Shorthair",
    "type": "Cat",
    "gender": "Female",
    "status": "Available",
    "description": "Friendly cat with white mittens on her paws.",
    "image": "/images/pets/mittens.jpeg",
    "shelterId": shelter_id3
})

pets.insert_one({
    "name": "Hopper",
    "age": 1,
    "breed": "Holland Lop",
    "type": "Rabbit",
    "gender": "Male",
    "status": "Available",
    "description": "Adorable bunny with floppy ears.",
    "image": "/images/pets/hopper.jpeg",
    "shelterId": shelter_id3
})

pets.insert_one({
    "name": "Spike",
    "age": 3,
    "breed": "Bearded Dragon",
    "type": "Reptile",
    "gender": "Male",
    "status": "Available",
    "description": "Friendly reptile who enjoys basking under the heat lamp.",
    "image": "/images/pets/spike.jpg",
    "shelterId": shelter_id3
})

# Pets for Little Paws Rescue
pets.insert_one({
    "name": "Teddy",
    "age": 2,
    "breed": "Pomeranian",
    "type": "Dog",
    "gender": "Male",
    "status": "Available",
    "description": "Fluffy little ball of energy.",
    "image": "/images/pets/teddy.jpeg",
    "shelterId": shelter_id4
})

pets.insert_one({
    "name": "Coco",
    "age": 3,
    "breed": "Chihuahua",
    "type": "Dog",
    "gender": "Female",
    "status": "Available",
    "description": "Tiny dog with a big personality.",
    "image": "/images/pets/coco.jpeg",
    "shelterId": shelter_id4
})

pets.insert_one({
    "name": "Buddy",
    "age": 5,
    "breed": "Miniature Poodle",
    "type": "Dog",
    "gender": "Male",
    "status": "Available",
    "description": "Smart and hypoallergenic companion.",
    "image": "/images/pets/buddy.jpeg",
    "shelterId": shelter_id4
})

pets.insert_one({
    "name": "Princess",
    "age": 4,
    "breed": "Maltese",
    "type": "Dog",
    "gender": "Female",
    "status": "Available",
    "description": "Elegant and gentle lap dog.",
    "image": "/images/pets/princess.jpeg",
    "shelterId": shelter_id4
})

pets.insert_one({
    "name": "Bolt",
    "age": 1,
    "breed": "Jack Russell Terrier",
    "type": "Dog",
    "gender": "Male",
    "status": "Available",
    "description": "Energetic and fast little dog.",
    "image": "/images/pets/bolt.jpeg",
    "shelterId": shelter_id4
})

# Pets for Exotic Haven
pets.insert_one({
    "name": "Apollo",
    "age": 10,
    "breed": "Ball Python",
    "type": "Reptile",
    "gender": "Male",
    "status": "Available",
    "description": "Docile snake perfect for beginners.",
    "image": "/images/pets/apollo.jpeg",
    "shelterId": shelter_id5
})

pets.insert_one({
    "name": "Athena",
    "age": 5,
    "breed": "Cockatiel",
    "type": "Bird",
    "gender": "Female",
    "status": "Available",
    "description": "Friendly and musical bird who loves to sing.",
    "image": "/images/pets/athena.jpeg",
    "shelterId": shelter_id5
})

pets.insert_one({
    "name": "Zeus",
    "age": 2,
    "breed": "Leopard Gecko",
    "type": "Reptile",
    "gender": "Male",
    "status": "Available",
    "description": "Easy to care for gecko with beautiful spots.",
    "image": "/images/pets/zeus.jpeg",
    "shelterId": shelter_id5
})

pets.insert_one({
    "name": "Neptune",
    "age": 1,
    "breed": "Betta Fish",
    "type": "Fish",
    "gender": "Male",
    "status": "Available",
    "description": "Vibrant blue betta with flowing fins.",
    "image": "/images/pets/neptune.jpeg",
    "shelterId": shelter_id5
})

pets.insert_one({
    "name": "Mercury",
    "age": 3,
    "breed": "Ferret",
    "type": "Small Mammal",
    "gender": "Male",
    "status": "Available",
    "description": "Playful and curious ferret who loves toys.",
    "image": "/images/pets/mercury.jpeg",
    "shelterId": shelter_id5
})

print("Database populated successfully with 5 shelters and 25 pets!")