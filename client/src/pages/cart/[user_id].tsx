import React, { useEffect, useState } from 'react';
import { Box, Button, Container, Typography, Snackbar, Alert, TextField, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks';
import useCart, { CartItem } from '@/hooks/useCart';
import useOrder from '@/hooks/useOrder';
import useUser from '@/hooks/useUser';

const CartPage: React.FC = () => {
    const router = useRouter();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
    const { authenticated, logout, user } = useAuth();
    const { cart, cartItems, getAllCartItems, updateCartItem, deleteCartItem, deleteCart, loading, error, resetError } = useCart();
    const [userId, setUserId] = useState<string | null>(null);
    const { createOrder } = useOrder();
    const { userData, getUserById } = useUser();

    useEffect(() => {
        if (user && user.uid) {
            setUserId(user.uid);
            getUserById(user.uid);
        }
    }, [user]);

    useEffect(() => {
        if (userId) {
            getAllCartItems(userId);
        }
    }, [userId]);

    useEffect(() => {
        if (error) {
            setSnackbarMessage(error);
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        }
    }, [error]);

    const getDate = (): string => {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Adiciona 1 porque os meses são indexados em 0
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const handleQuantityChange = async (item: CartItem, newQuantity: number) => {
        if (newQuantity <= 0 || newQuantity == null || isNaN(newQuantity)) {
            handleRemoveItem(item.item_id);
        } else {
            await updateCartItem(userId!, item.item_id, { ...item, quantity: newQuantity }); 
        }
        await getAllCartItems(userId!); 
    };

    const handleSizeChange = async (item: CartItem, newSize: string) => {
        await updateCartItem(userId!, item.item_id, { ...item, size: newSize });
        await getAllCartItems(userId!);
    };

    const handleRemoveItem = async (itemId: string) => {
        await deleteCartItem(userId!, itemId); 
        await getAllCartItems(userId!); 
    };

    const handleCheckout = async () => {
        // Adicione a lógica de finalização do pedido aqui
        cartItems.map(async (item) => {
            const order = {
                id: '',
                email: userData?.email as string,
                item: item.name,
                description: item.description,
                qtd: item.quantity,
                price: item.price,
                status: 'Aguardando Pagamento',
                date: getDate(),
                addr: userData?.address as string
            };
            createOrder(order);
        });

        setSnackbarMessage('Todos os pedidos foram realizados!');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
        deleteCart(userId as string);
        console.log('Finalizar pedido');
        router.push(`/payment/user`)
    };

    return (
        <Container maxWidth="md" sx={{ backgroundColor: 'background.paper', borderRadius: '1rem', py: 4, boxShadow: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: '700', textAlign: 'center', color: 'text.primary', mb: 4, mt: 1 }}>
                Carrinho de Compras
            </Typography>
            {cartItems.length === 0 ? (
                <Typography variant="h6" component="p" sx={{ textAlign: 'center', color: 'text.secondary' }}>
                    Seu carrinho está vazio.
                </Typography>
            ) : (
                <Box>
                    {cartItems.map((item) => (
                        <Box key={item.item_id} sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                            <Box component="img" src={item.image} alt={item.name} sx={{ width: 100, height: 100, borderRadius: 1, mr: 2 }} />
                            <Box sx={{ flexGrow: 1 }}>
                                <Typography variant="h6" component="p">{item.name}</Typography>
                                <Typography variant="body2" component="p" color="text.secondary">{item.description}</Typography>
                                <Typography variant="body1" component="p">R$ {item.price.toFixed(2)}</Typography>
                            </Box>
                            <FormControl sx={{ width: 100, mr: 2 }}>
                                <InputLabel id={`size-select-label-${item.item_id}`}>Tamanho</InputLabel>
                                <Select
                                    labelId={`size-select-label-${item.item_id}`}
                                    value={item.size}
                                    label="Tamanho"
                                    onChange={(e: SelectChangeEvent<string>) => handleSizeChange(item, e.target.value as string)}
                                >
                                    {['PP', 'P', 'M', 'G', 'GG'].map((size) => (
                                        <MenuItem key={size} value={size}>
                                            {size}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <TextField
                                label="Quantidade"
                                type="number"
                                variant="outlined"
                                size="small"
                                value={item.quantity}
                                onChange={(e) => handleQuantityChange(item, parseInt(e.target.value))}
                                sx={{ width: 100, mr: 2}}                                
                                InputProps={{
                                    inputProps: { min: 1, style: { textAlign: 'center' } }
                                }}
                            />
                            <Button variant="contained" color="secondary" onClick={() => handleRemoveItem(item.item_id)}>
                                Remover
                            </Button>
                        </Box>
                    ))}
                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h6" component="p" sx={{ textAlign: 'right' }}>
                            Total: R$ {cart?.price.toFixed(2)}
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleCheckout}
                            sx={{ mt: 2, width: '100%', py: 2 }}
                        >
                            Finalizar Pedido
                        </Button>
                    </Box>
                </Box>
            )}
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default CartPage;