const NUM = "[1-9][0-9]{9,14}"; // number b/w 10 -15
const NAME = "([a-zA-Z]){0,30}"; // name of letterss 1-30

const Validate = (name, value) => {
   let errors = {};
   switch (name) {
      case "name":
         errors.name =
            value.length === 0
               ? "Name is required"
               : !value.match(NAME)
               ? "Enter a valid Name"
               : "";
         break;
         case "mobno":
         errors.mobno =
            value.length === 0
               ? "Mobile Number is required"
               : !value.match(NUM)
               ? "Enter a valid number"
               : "";
         break;
      default:
         break;
   }

   return {
      errors
   };
};

export default Validate;
