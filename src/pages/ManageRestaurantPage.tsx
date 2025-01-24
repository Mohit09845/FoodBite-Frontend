import { useCreateMyRestaurant, useGetMyRestaurant, useUpdateRestaurant } from "@/api/myRestaurantApi"
import { ManageRestaurantForm } from "@/forms/manage-restaurant-forms/ManageRestaurantForm"


const ManageRestaurantPage = () => {
  const {createRestaurant,isLoading: createLoading} = useCreateMyRestaurant();
  const {restaurant} = useGetMyRestaurant();
  const {updateRestaurant,isLoading: updateLoading} = useUpdateRestaurant();

  const isEditing = !!restaurant;

  return (
    <div>
        <ManageRestaurantForm restaurant={restaurant} onSave={isEditing ? updateRestaurant : createRestaurant} isLoading={createLoading || updateLoading}/>
    </div>
  )
}

export default ManageRestaurantPage