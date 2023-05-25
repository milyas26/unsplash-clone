import { toast } from "react-toastify";

export const getLikedPhoto = (id: string, favorites: Array<any>) => {
    return favorites.find((photo) => photo.id === id);
}

export const handleFavorite = async (photo: any, favorites: Array<any>, dispatch: (arg0: { type: string; value: any[]; }) => void) => {
    const isLiked = favorites.find((item) => item.id === photo.id);
    if(!isLiked) {
      dispatch({
        type: "MUTATE_FAVORITES",
        value: [...favorites, photo],
      })

      toast.success("Added to favorites");
    } else {
      dispatch({
        type: "MUTATE_FAVORITES",
        value: [...favorites.filter((item) => item.id !== photo.id)],
      })
      toast.success("Removed from favorites");
    }
  }