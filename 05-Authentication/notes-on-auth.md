## Authentication
- **Authentication** - is a process to check whether you can access a resource/page or not , it's about verifying your identity and checking if you shpuld be granted access or not.
- **Authorization** - is a prcoess after you are authenticated and it checks whether you are allowed to access / modify a resouce or not. it's a second step verification to know what role to give you (admin , viewer , editor ans such).
## Security
- **bcrypt** - is a package we use to hash(changing the password to a sequence of characters one way meaning can't be rechanged to get the original) our password.
 - we might add **salt** (group of strings added to the password by our code before hashin) and **pepper** (similar but usually one letter) before hashing it - this makes it more secure.
```javaScript
    // after importing 
    bcrypt.hash(password)
    //with salt
   const salt = bcrypt.genSalt()//
   bcrypt.hash(password,salt)
```
### **Tokens**
 - **JWT**(JSON Web Tokens) : 
