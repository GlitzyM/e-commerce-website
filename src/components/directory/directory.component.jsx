import CategoryItem from "../category-item/category-item.component";
import "./directory.styles.scss";

const Directory = ({ categories }) => {
  return (
    <div className="directory-container">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} /> //The `category` is passed to the CategoryItem component. The imageUrl and title is destructured in the component file, the id is destructured here.
      ))}
    </div>
  );
};

export default Directory;
