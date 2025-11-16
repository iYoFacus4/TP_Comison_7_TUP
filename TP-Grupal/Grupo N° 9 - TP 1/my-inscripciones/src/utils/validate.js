export const validateEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };
  
  export const validateDNI = (dni) => {
    return /^\d{7,8}$/.test(dni);
  };
  