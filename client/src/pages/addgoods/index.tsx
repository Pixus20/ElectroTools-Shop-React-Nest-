import { useMutation } from "@apollo/client";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { CREATE_PRODUCT } from "../../../graphql/product/addProduct";


export default function CreateProductPage() {
  const [formData, setFormData] = useState({
    name: "",
    imgURL: "",
    shortDescr: "",
    fullDescr: "",
    price: "",
    category: "",
    color: "",
    season: "",
    quantity: "",
    buyerId: "",
  });

  const [createProduct, { loading, error }] = useMutation(CREATE_PRODUCT);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createProduct({
        variables: {
          createProductInput: {
            ...formData,
            price: parseFloat(formData.price),
            quantity: parseInt(formData.quantity),
            buyerId: parseInt(formData.buyerId),
          },
        },
      });
      alert("Товар додано успішно!");
      setFormData({
        name: "",
        imgURL: "",
        shortDescr: "",
        fullDescr: "",
        price: "",
        category: "",
        color: "",
        season: "",
        quantity: "",
        buyerId: "",
      });
    } catch (err) {
      console.error("Помилка при створенні товару:", err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Додати товар</Typography>
      <form onSubmit={handleSubmit} className="p-4">
        <Grid container  spacing={2}>
          {[
            { name: "name", label: "Назва товару" },
            { name: "imgURL", label: "URL зображення" },
            { name: "shortDescr", label: "Короткий опис" },
            { name: "fullDescr", label: "Повний опис" },
            { name: "price", label: "Ціна", type: "number" },
            { name: "category", label: "Категорія" },
            { name: "color", label: "Колір" },
            { name: "season", label: "Сезон" },
            { name: "quantity", label: "Кількість", type: "number" },
            { name: "buyerId", label: "ID покупця", type: "number" },
          ].map(({ name, label, type }) => (
            <Grid item xs={12} key={name}>
              <TextField
                fullWidth
                name={name}
                label={label}
                type={type || "text"}
                value={(formData as any)[name]}
                onChange={handleChange}
                required
              />
            </Grid>
          ))}
        </Grid>

        <Button
  type="submit"
  disabled={loading}
  sx={{
    mt: 2,
    backgroundColor: '#fcd34d', 
    color: '#000',
    '&:hover': {
      backgroundColor: '#fbbf24', 
    },
  }}
>
  {loading ? "Додається..." : "Додати товар"}
</Button>

        {error && <Typography color="error">Помилка: {error.message}</Typography>}
      </form>
    </Container>
  );
}
