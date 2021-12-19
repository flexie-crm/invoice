import dayjs from "dayjs";
import "dayjs/locale/sq";

dayjs.locale("sq");

export const ConfigSkeleton = ({ certIssued, certExpire, isInVat }) => (
  <div style={{ visibility: "visible", position: "relative" }}>
    <div className="row flexieForm-component-columns">
      <div className="col col-sm-6">
        <div className="form-group has-feedback flexieForm-component-textfield required">
          <label className="control-label field-required">Emri</label>
          <input type="text" className="form-control" />
        </div>
      </div>
      <div className="col col-sm-6">
        <div className="form-group has-feedback flexieForm-component-textfield required">
          <label className="control-label field-required">Mbiemri</label>
          <input type="text" className="form-control" />
        </div>
      </div>
    </div>
    <div className="row flexieForm-component-columns">
      <div className="col col-sm-6">
        <div className="form-group has-feedback flexieForm-component-email required">
          <label className="control-label field-required">Email Juaj</label>
          <input type="email" className="form-control" />
        </div>
      </div>
      <div className="col col-sm-6">
        <div className="form-group has-feedback flexieForm-component-phoneNumber required">
          <label className="control-label field-required">
            Numri Telefonit (cel)
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="06________"
          />
        </div>
      </div>
    </div>
    <div className="flexieForm-component">
      <h2 className="mt-20 horizontal-rule align-left " />
    </div>

    <div className="form-check form-group has-feedback flexieForm-component flexieForm-component-checkbox fx-checkbox">
      <label className="control-label form-check-label fx-checkbox check-bounce">
        <input
          name="data"
          type="checkbox"
          className="form-check-input fx-checkbox"
          lang="en"
          value="1"
          checked={isInVat}
          onChange={(e) => {}}
        />
        <svg viewBox="0 0 18 18">
          <polyline points="4 10.74 7.5 14.25 14 7"></polyline>
        </svg>
        <span>Biznesi im është në regjistrin e TVSH-së</span>
      </label>
    </div>

    <div className="row flexieForm-component-columns">
      <div className="col col-sm-6">
        <div className="form-group has-feedback flexieForm-component-textfield required">
          <label className="control-label field-required">
            Njesia e Biznesit
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="__________"
          />
        </div>
      </div>
      <div className="col col-sm-6">
        <div className="form-group has-feedback flexieForm-component-textfield required">
          <label className="control-label field-required">
            Kodi Operatorit
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="__________"
          />
        </div>
      </div>
    </div>
    <div className="flexieForm-component">
      <h2 className="mt-20 horizontal-rule align-left " />
    </div>

    <div className="flexieForm-component">
      <div className="explain-success">
        <p>
          Nese certifikata eshte duke skaduar, mund te ngarkoni certifikaten e
          re me poshte. Gjithsesi ju do te njoftoheni disa dite perpara skadimit
          te certifikates.
        </p>
        <br />
        <p>
          Certifikata krijuar me:{" "}
          <b>{dayjs(certIssued * 1000).format("DD MMMM, YYYY")}</b>
        </p>
        <p>
          Certifikata skadon me:{" "}
          <b>{dayjs(certExpire * 1000).format("DD MMMM, YYYY")}</b>
        </p>
      </div>
    </div>

    <div className="form-group has-feedback flexieForm-component-file required">
      <label className="control-label field-required">
        Ngarko Certifikaten Elektronike
      </label>
      <div>
        <ul className="list-group list-group-striped">
          <li className="list-group-item list-group-header hidden-xs hidden-sm">
            <div className="row">
              <div className="col-md-9">
                <strong>File Name</strong>
              </div>
              <div className="col-md-3 text-right">
                <strong>Size</strong>
              </div>
            </div>
          </li>
        </ul>
        <div className="uploadBoxContainer">
          <div className="fileSelector">
            <i className="fas fa-cloud-upload-alt" /> Hidh certifikaten ketu,
            ose{" "}
            <a href="#" className="browse">
              zgjidhe
            </a>
          </div>
          <p className="small" />
        </div>
        <div style={{ marginTop: "10px" }} />
      </div>
    </div>
    <div className="row flexieForm-component-columns">
      <div className="col col-sm-6">
        <div className="form-group has-feedback flexieForm-component-textfield required">
          <label className="control-label field-required">
            Fjalekalimi i Certifikates Elektronike
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Fjalekalimi sic ju ka ardhur nga AKSHI"
          />
        </div>
      </div>
      <div className="col col-sm-6">
        <div className="form-group has-feedback flexieForm-component-textfield required">
          <label className="control-label field-required">NIPT</label>
          <input
            type="text"
            className="form-control"
            placeholder="Vendos NIPT-in e subjektit"
          />
        </div>
      </div>
    </div>
    <div className="flexieForm-component-button form-group">
      <button type="submit">Ndrysho</button>
    </div>
  </div>
);
