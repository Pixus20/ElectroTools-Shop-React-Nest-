'use client';

import { useMutation, useQuery } from '@apollo/client';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { GET_CURRENT_USER, UPDATE_USER } from '../../../graphql/user/me';


export default function ProfilePage() {
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_CURRENT_USER);
  const [updateMe, { loading: loadingUpdate, error: errorUpdate }] = useMutation(UPDATE_USER);

  const handleSubmit = async () => {
    try {
      await updateMe({
        variables: {
          input: {
            firstName: formData.firstName,
            secondName: formData.secondName,
            nicname: formData.nicname,
            avatarURL: formData.avatarURL,
            birthDay: formData.birthDay,
            sex: formData.sex,
          },
        },
      });
      alert('Профіль оновлено');
    } catch (e) {
      console.error('Помилка оновлення:', e);
    }
  };

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    secondName: '',
    nicname: '',
    email: '',
    avatarURL: '',
    birthDay: '',
    sex: '',
  });

  React.useEffect(() => {
    if (data?.me) {
      setFormData({
        firstName: data.me.firstName || '',
        secondName: data.me.secondName || '',
        nicname: data.me.nicname || '',
        email: data.me.email || '',
        avatarURL: data.me.avatarURL || '',
        birthDay: data.me.birthDay || '',
        sex: data.me.sex || '',
      });
    }
  }, [data]);

  if (loading) return <p>Завантаження...</p>;
  if (error) return <p>Помилка: {error.message}</p>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/'); 
  };

  return (
    <div className="p-6 max-w-md  mx-auto">
      <h1 className="text-2xl font-bold mb-4">Профіль користувача</h1>

      {!isEditing ? (
        <div>
          <img
            src={data.me.avatarURL}
            alt="Аватар"
            style={{ width: 100, height: 100, borderRadius: '50%', marginTop: 10 }}
          />
          <p><strong>Ім'я:</strong> {data.me.firstName}</p>
          <p><strong>Прізвище:</strong> {data.me.secondName}</p>
          <p><strong>Нікнейм:</strong> {data.me.nicname}</p>
          <p><strong>Email:</strong> {data.me.email}</p>
          <p><strong>Дата народження:</strong> {new Date(data.me.birthDay).toLocaleDateString()}</p>
          <p><strong>Стать:</strong> {data.me.sex}</p>
          <p><strong>Роль:</strong> {data.me.role}</p>
          <p><strong>Дата створення акаунту:</strong> {new Date(data.me.createdAt).toLocaleDateString()}</p>
          

          {data.me.role === 'MODERATOR' || 'ADMIN' && (
              <button
                onClick={() => router.push('/addgoods')}
                className="mt-6 px-4 mr-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                ➕ Додати товар
              </button>
            )}
            {data.me.role === 'ADMIN' && (
              <button
                onClick={() => router.push('/orderlist')}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                📦 Показати замовлення
              </button>
            )}
          <button
            onClick={handleEditToggle}
            className="mt-4 flex items-center text-orange-500 hover:text-orange-700"
            title="Редагувати профіль"
          >
            <EditIcon />
            <span className="ml-2">Редагувати</span>
          </button>
          <button
            onClick={handleLogout}
            className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Вийти
          </button>
        </div>
      ) : (
        <div className="space-y-5 ">
          <div className="mb-5">
            <TextField
              fullWidth
              label="Ім'я"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>

          <div className="mb-5">
            <TextField
              fullWidth
              label="Прізвище"
              name="secondName"
              value={formData.secondName}
              onChange={handleChange}
            />
          </div>

          <div className="mb-5">
            <TextField
              fullWidth
              label="Нікнейм"
              name="nicname"
              value={formData.nicname}
              onChange={handleChange}
            />
          </div>

          <div className="mb-5">
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled
            />
          </div>

          <div className="mb-5">
            <TextField
              fullWidth
              label="Аватар URL"
              name="avatarURL"
              value={formData.avatarURL}
              onChange={handleChange}
            />
          </div>

          <div className="mb-5">
            <TextField
              fullWidth
              label="Дата народження"
              name="birthDay"
              type="date"
              value={formData.birthDay.slice(0, 10)}
              onChange={handleChange}
            />
          </div>

          <div className="mb-5">
            <TextField
              fullWidth
              label="Стать"
              name="sex"
              value={formData.sex}
              onChange={handleChange}
            />
          </div>

    <div className="flex justify-end gap-2 mt-4">
      <Button variant="outlined" color="error" onClick={handleEditToggle}>
        Відміна
      </Button>
      <Button variant="contained" color="primary" onClick={handleSubmit} disabled={loading}>
        Зберегти
      </Button>
    </div>
  </div>
      )}
    </div>
  );
}
