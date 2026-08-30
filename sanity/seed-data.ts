// Paste this array into a Sanity import script or create the records in Studio.
// Image and hero video references are deliberately omitted for client upload.
export const seedDestinations=['United Kingdom','United States','Singapore','Germany','Dubai','Italy'].map(name=>({_type:'destination',name,slug:{_type:'slug',current:name.toLowerCase().replaceAll(' ','-')},tag:name==='Dubai'?'Holiday & Visit':'Study & Visit'}));
export const seedServices=[['Visa Assistance','passport'],['Study Abroad','graduation-cap'],['Flight Reservation','plane'],['Hotel Reservation','home'],['Work & Relocation','globe'],['Travel Consultant','globe']].map(([title,icon])=>({_type:'service',title,icon,slug:{_type:'slug',current:title.toLowerCase().replaceAll(' & ','-').replaceAll(' ','-')}}));
