import styles from './IngredientDetails.module.css';
import {ingredientType} from '../../utils/types';

function IngredientDetails(props) {
  const {item} = props;
  return (
    <div className={styles.ingredientDetails}>
        <img src={item.image_large} alt={item.name} className={`${styles.image} ml-5 mr-5`} />
        <p className="text text_type_main-medium mt-4">{item.name}</p>
        <div className={`${styles.details} mt-8`}>
          <div className={styles.detail}>
            <p className="text text_type_main-default text_color_inactive mt-1">Калории,ккал</p>
            <p className="text text_type_digits-default text_color_inactive mt-1">{item.calories}</p>          
          </div>
          <div className={styles.detail}>
            <p className="text text_type_main-default text_color_inactive mt-1">Белки, г</p>
            <p className="text text_type_digits-default text_color_inactive mt-1">{item.proteins}</p>            
          </div>
          <div className={styles.detail}>
            <p className="text text_type_main-default text_color_inactive mt-1">Жиры, г</p>
            <p className="text text_type_digits-default text_color_inactive mt-1">{item.fat}</p>            
          </div>
          <div className={styles.detail}>
            <p className="text text_type_main-default text_color_inactive mt-1">Углеводы, г</p>
            <p className="text text_type_digits-default text_color_inactive mt-1">{item.carbohydrates}</p>
          </div>
        </div>
    </div>
  );
};

IngredientDetails.propTypes = {
  item: ingredientType.isRequired
};

export default IngredientDetails;