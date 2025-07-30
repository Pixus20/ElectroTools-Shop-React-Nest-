interface RelatedProduct {
   id: string;
   name: string;
   price: number;
 }
 
 interface Props {
   related: RelatedProduct[];
 }
 
 export default function RelatedProducts({ related }: Props) {
   if (!related.length) return null;
 
   return (
     <div className="mt-3">
       <h3 className="font-semibold text-orange-600 mb-2">Часто купують разом:</h3>
       <ul className="flex gap-4">
         {related.map((rel) => (
           <li key={rel.id} className="border rounded p-2 w-40">
             <p>{rel.name}</p>
             <p className="text-sm text-gray-700">{rel.price} грн</p>
           </li>
         ))}
       </ul>
     </div>
   );
 }