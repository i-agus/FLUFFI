from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db = client["pet_adoption_system"]

# Clear old data (optional)
db["shelters"].delete_many({})
db["pets"].delete_many({})
db["applications"].delete_many({})

# Insert shelters
shelters = db["shelters"]
shelter_id = shelters.insert_one({
    "name": "Happy Paws Shelter",
    "email": "contact@happypaws.com",
    "phone": "123-456-7890",
    "address": "123 Bark Lane, Paw City",
    "description": "A loving home for pets waiting for adoption.",
    "image": "/images/shelters/happy_paws.jpg"
}).inserted_id

# Insert admin user
db["admins"].delete_many({})
db["admins"].insert_one({
    "username": "admin",
    "password": "admin123",  # In production, hash this!
    "email": "admin@fluffi.com"
})

# Insert pets
pets = db["pets"]
pets.insert_many([
    {
        "name": "Max",
        "age": 3,
        "breed": "Labrador",
        "type": "Dog",
        "gender": "Male",
        "status": "Available",
        "description": "Friendly and energetic.",
        "image": "/images/pets/max.jpg",
        "shelterId": shelter_id
    },
    {
        "name": "Luna",
        "age": 2,
        "breed": "Persian Cat",
        "type": "Cat",
        "gender": "Female",
        "status": "Available",
        "description": "Loves cuddles and naps.",
        "image": "/images/pets/luna.jpg",
        "shelterId": shelter_id
        
    },
    
        {
        "name": "Bugs",
        "age": 2,
        "breed": "White Bunny",
        "type": "Rabbit",
        "gender": "Female",
        "status": "Available",
        "description": "Loves to hop around and play.",
        "image": "/images/pets/bugs.jpeg",
        "shelterId": shelter_id
        
    }
])

