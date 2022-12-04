import React from "react";
import {NextPageWithLayout} from "./_app";
import FrontLayout from "../components/layout/frontLayout";

const AdminsCodeOfConduct: NextPageWithLayout = () =>
  <div className="flex flex-col gap-3 p-8">
    <h1>Code of conduct pentru administratorii de comunități</h1>
    <ul>
      <li>Sa verifice / aprobe / respingă cererile referitoare la noi locatii nou venite pe platforma in maxim 3 zile de la data adaugarii acestora.</li>
      <li>Să se asigure din surse publice de acuratețea datelor referitoare la locațiile sugerate de către utilizatori.</li>
      <li>Să nu adauge locații care nu pot fi verificate  din surse publice (prestări de servicii la domiciliu fără forme legale,  etc.)</li>
      <li>Să raporteze către DCB orice disfuncționalitate tehnica a platformei</li>
      <li>Să se se asigure ca pe hartă nu sunt adaugate locații care încalcă legea statului de care aparține comunitatea administrată</li>
      <li>Să ia măsuri periodic de a se asigura ca adresele rămân relevante si nu au intervenit schimbări</li>
    </ul>
    <p>Nerespectarea sau încălcarea repetată clauzelor mai sus menționate poate atrage retragerea dreptului de a
      administra comunitatea respectivă.</p>
  </div>;

AdminsCodeOfConduct.getLayout = (page) => <FrontLayout>{page}</FrontLayout>

export default AdminsCodeOfConduct;
