

export const getToken=(name)=>{
  const value = `; ${document.cookie}`;
  console.log(value,'value')
  const parts = value.split(`; ${name}=`);
  console.log(parts,'parts')
  console.log(parts.length,'lengthhhhhhhhhhhh')
  if (parts.length === 2){
    const token=parts.pop().split(";").shift()
    console.log(token,'tokennnnnn')
    return token;
  }
   
}
