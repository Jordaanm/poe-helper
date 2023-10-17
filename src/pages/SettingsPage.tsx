import { useForm, SubmitHandler } from "react-hook-form";
import { ApplicationSettings, ApplicationSettingsContext, SettingsContext } from "../contexts/settings-context";
import { useContext, useEffect } from "react";

import "./SettingsPage.scss";

export const SettingsPage = () => {
  const { setSettings, settings } = useContext<ApplicationSettingsContext>(SettingsContext);
  const { setValue, register, handleSubmit } = useForm<ApplicationSettings>();

  useEffect(() => {
    setValue('poeUsername', settings.poeUsername);
  }, [settings]);

  const onSubmit:SubmitHandler<ApplicationSettings> = (data => {
    setSettings(data);
  });

  return (
    <div className="page-content settings-page">
      <h1>Settings</h1>
      <form className="col" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-row">
          <label htmlFor="poeUsername">PoE Username</label>
          <input
            id="poeUsername"
            {...register('poeUsername')}
          />
        </div>
        <div className="row">
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
}