import { createSlice , PayloadAction} from "@reduxjs/toolkit";

export interface Order {
    orderId: string;
    start:{
        latiude: number;
        longitude: number;
    };
    end:{
        latitude: number;
        longitude: number;
    };
    price: number;
}

interface InitialState {
    orders: Order[],
    deliveries: Order[],
}

const initialState: InitialState ={
    orders:[], // 실제 주문이 들어 왔을
    deliveries:[], // 실시간으로 수락한 오더

};
const orderSlice = createSlice({
    name: 'order',  // 이름 
    initialState,   // 초기 상태
    reducers:{      // 리듀서 
        addOrder(state, action: PayloadAction<Order>) {
            state.orders.push(action.payload);
        },       // 주문 추가하기  
        acceptOrder(state,action:PayloadAction<string>){
            const index = state.orders.findIndex((v)=>v.orderId === action.payload);
            if(index > -1 ){
                state.deliveries.push(state.orders[index]);
                state.orders.splice(index,1);
            }
        },    // 주문 수락하기 
        rejectOrder(state,action: PayloadAction<string>){
            const index = state.orders.findIndex((v)=> v.orderId === action.payload);
            if(index > -1){
                state.orders.splice(index,1);
            }
            const delibery = state.deliveries.findIndex((v)=>v.orderId === action.payload);
            if(delibery > -1 ){
                state.deliveries.splice(index,1);
            }
        }     // 주문 거절하기 
    },
    extraReducers: ()=>{},
})

export default orderSlice;