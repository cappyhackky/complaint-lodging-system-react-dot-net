namespace Comp_Sys.Essentials
{
    public class PasswordManager
    {
        public string HashGenerator(string Password)
        {
            if (Password == null)
            {
                throw new ArgumentNullException(nameof(Password), "Password cannot be null");
            }
            return BCrypt.Net.BCrypt.HashPassword(Password, BCrypt.Net.BCrypt.GenerateSalt());
        }
        public bool ValidatePassword(string Password, string HashedPassword)
        {
            return BCrypt.Net.BCrypt.Verify(Password, HashedPassword);
        } 
    }
}
