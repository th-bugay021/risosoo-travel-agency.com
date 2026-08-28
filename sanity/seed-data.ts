// Paste this array into a Sanity import script or create the records in Studio.
// Image and hero video references are deliberately omitted for client upload.
export const seedDestinations=['United Kingdom','United States','Singapore','Germany','Dubai','Japan'].map(name=>({_type:'destination',name,slug:{_type:'slug',current:name.toLowerCase().replaceAll(' ','-')},tag:name==='Dubai'?'Holiday & Visit':'Study & Visit'}));
export const seedServices=['Visa Assistance','Study Abroad','Flight Reservation','Hotel Reservation','Work & Relocation','Travel Consultant'].map(title=>({_type:'service',title,slug:{_type:'slug',current:title.toLowerCase().replaceAll(' & ','-').replaceAll(' ','-')}}));
