import ChromaGrid from "@/components/GoodsPage/ChromaGrid";
import { useQuery } from "@apollo/client";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { GET_PRODUCTS } from "../../../graphql/product/getProduct";

export default function Goods() {
  const { data, loading, error } = useQuery(GET_PRODUCTS);


  if (loading) return <p>Завантаження товарів...</p>;
  if (error) return <p>Помилка при завантаженні: {error.message}</p>;

  const products = data.products;

  const items = data.products.map((product: any) => ({
    image: product.imgURL,
    title: product.name,
    subtitle: product.shortDescr,
    price: product.price,
    borderColor: "#10B981",
    gradient: "linear-gradient(180deg, #10B981, #000)",
    url: `/goods/${product.id}`,
  }));

  const options = Array.from(
    new Set(products.map((p: any) => p.category))
  ).map((cat) => ({ label: cat, id: cat }));

  return (
    <div style={{ height: '100%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', position: 'relative' }} >
      <div className="max-w-[1280px] mx-auto">
        <Autocomplete
          className="pb-3"
          disablePortal
          options={options}
          sx={{ width: 200 }}
          renderInput={(params) => <TextField {...params} label="Category" />}
        />
        <ChromaGrid 
          items={items}
          radius={300}
          damping={0.45}
          fadeOut={0.6}
          ease="power3.out"
        />
      </div>
    </div>
  );
}
