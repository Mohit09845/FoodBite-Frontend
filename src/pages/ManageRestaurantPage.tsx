import { useCreateMyRestaurant } from "@/api/myRestaurantApi"
import { ManageRestaurantForm } from "@/forms/manage-restaurant-forms/ManageRestaurantForm"


const ManageRestaurantPage = () => {
  const {createRestaurant,isLoading} = useCreateMyRestaurant();
  return (
    <div>
        <ManageRestaurantForm onSave={createRestaurant} isLoading={isLoading}/>
    </div>
  )
}

export default ManageRestaurantPage