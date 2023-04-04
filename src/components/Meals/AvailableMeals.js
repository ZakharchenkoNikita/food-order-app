import { useEffect, useState } from "react";
import classes from "./AvailableMeals.module.css";

import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import useHttp from "../../hooks/use-http";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);

  const { isLoading, error, sendRequest: fetchMeals } = useHttp();

  useEffect(() => {
    const transformMeals = (mealsObject) => {
      const loadedMeals = [];

      for (const key in mealsObject) {
        loadedMeals.push({
          id: key,
          name: mealsObject[key].name,
          description: mealsObject[key].description,
          price: mealsObject[key].price,
        });
      }
      setMeals(loadedMeals);
    };

    fetchMeals(
      {
        url: "https://reactmeals-23e37-default-rtdb.europe-west1.firebasedatabase.app/meals.json",
      },
      transformMeals
    );
  }, [fetchMeals]);

  let mealsList = <h2>No meals found. </h2>;

  if (meals.length > 0) {
    mealsList = meals.map((meal) => (
      <MealItem
        id={meal.id}
        key={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    ));
  }

  let content = mealsList;

  if (error) {
    content = "Reload the page, please.";
  }

  if (isLoading) {
    content = "Loading meals...";
  }

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{content}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
