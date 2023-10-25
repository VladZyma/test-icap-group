import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { userValidator } from "../../validators/user.validator";
import { userActions } from "./userSlice";
import formatBirthday from "./formatBirthday";

import styles from "./UserForm.module.css";

function UserForm({ onCloseModal }) {
  const defaultDate = new Date().toISOString().split("T")[0];

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm({ mode: "all", resolver: joiResolver(userValidator) });

  const { userForUpdate } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  function submit(user) {
    if (userForUpdate) {
      dispatch(userActions.updateUserById({ id: userForUpdate.id, user }));
      dispatch(userActions.setUserForUpdate(null));
    } else {
      dispatch(userActions.createUser({ user }));
    }

    reset();
    onCloseModal?.();
  }

  useEffect(() => {
    if (userForUpdate) {
      const birthday_date = formatBirthday(userForUpdate.birthday_date);

      setValue("name", userForUpdate.name, { shouldValidate: true });
      setValue("email", userForUpdate.email, { shouldValidate: true });
      setValue("birthday_date", birthday_date, {
        shouldValidate: true,
      });
      setValue("phone_number", userForUpdate.phone_number, {
        shouldValidate: true,
      });
      setValue("address", userForUpdate.address, { shouldValidate: true });
    }
  }, [setValue, userForUpdate]);

  return (
    <form className={styles.form} onSubmit={handleSubmit(submit)}>
      <label className={styles.label}>
        Name
        <input className={styles.input} type="text" {...register("name")} />
        {errors.name && <span>{errors.name.message}</span>}
      </label>

      <label className={styles.label}>
        Email
        <input className={styles.input} type="email" {...register("email")} />
        {errors.email && <span>{errors.email.message}</span>}
      </label>

      <label className={styles.label}>
        Birthday date
        <input
          className={styles.input}
          type="date"
          defaultValue={defaultDate}
          {...register("birthday_date")}
        />
        {errors.birthday_date && <span>{errors.birthday_date.message}</span>}
      </label>

      <label className={styles.label}>
        Phone number
        <input
          className={styles.input}
          type="text"
          {...register("phone_number")}
        />
        {errors.phone_number && <span>{errors.phone_number.message}</span>}
      </label>

      <label className={styles.label}>
        Address
        <textarea
          className={styles.textarea}
          {...register("address")}
        ></textarea>
        {errors.address && <span>{errors.address.message}</span>}
      </label>
      <button className={styles.btn} disabled={!isValid}>
        {userForUpdate ? "UPDATE" : "CREATE"}
      </button>
    </form>
  );
}

export default UserForm;
