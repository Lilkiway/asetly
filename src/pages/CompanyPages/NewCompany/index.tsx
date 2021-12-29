import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classes from './NewCompany.module.scss';
import { RootState } from '@RootStateType';
import { getCitiesList } from '@Actions/definition.action';
import { InputBase, Form, Divider } from '@UiKitComponents';
import { NewCompanyTypes } from '@Types/company.types';
import { postNewCompany } from '@Actions/company.action';
import { useNavigate } from 'react-router-dom';
import { Loader } from '@common';
import { schemaNewCompany } from '@helpers/yupSchemas';
import { CreateFormHeader, InputContainer } from '@components';

interface NewCompanyProps {}

const getDefinitionState = (state: RootState) => state.DefinitionReducer;
const getLoadingCompany = (state: RootState) =>
  state.CompanyReducer.loadingCompany;

const NewCompany: React.FC<NewCompanyProps> = () => {
  const { citiesList, loadingDefinition } = useSelector(getDefinitionState);
  const loadingCompany = useSelector(getLoadingCompany);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (newCompany: NewCompanyTypes) => {
    dispatch(postNewCompany(newCompany));
    if (!loadingCompany) {
      navigate('/Companies');
    }
  };

  useEffect(() => {
    if (!citiesList.length && !loadingDefinition) {
      dispatch(getCitiesList());
    }
  });

  if (loadingCompany || loadingDefinition) {
    return <Loader />;
  }

  return (
    <div className={classes.newCompany}>
      <div className={classes.newCompany_wrapper}>
        <Form<NewCompanyTypes> onSubmit={onSubmit} yupSchema={schemaNewCompany}>
          {({ register, formState: { errors } }) => (
            <>
              <CreateFormHeader title="New Company" errors={errors} />
              <div className={classes.form_box}>
                <InputContainer title="Summary">
                  <InputBase
                    errorText={errors.name?.message}
                    id="CompanyName"
                    placeholder="Company name"
                    label="Company name"
                    required
                    {...register('name')}
                  />
                  <InputBase
                    errorText={errors.partnerCode?.message}
                    id="CompanyCode"
                    placeholder="Company code"
                    label="Partner code"
                    required
                    {...register('partnerCode')}
                  />
                  <InputBase
                    errorText={errors.taxOffice?.message}
                    id="TaxOffice"
                    placeholder="Tax Office"
                    label="Tax Office"
                    {...register('taxOffice')}
                  />
                  <InputBase
                    errorText={errors.taxNumber?.message}
                    id="TXN"
                    placeholder="TXN"
                    label="TXN"
                    required
                    {...register('taxNumber')}
                  />
                </InputContainer>
                <Divider margin="50px 0 30px 0" />
                <div className={classes.helper_box}>
                  <InputContainer title="Location">
                    <InputBase
                      errorText={errors.cityId?.message}
                      id="City"
                      placeholder="Choose city"
                      label="City"
                      type="number"
                      required
                      {...register('cityId', { valueAsNumber: true })}
                    />

                    <InputBase
                      errorText={errors.address?.message}
                      id="Address"
                      placeholder="Add address"
                      label="Address"
                      required
                      {...register('address')}
                    />
                  </InputContainer>
                  <InputContainer title="Contacts">
                    <InputBase
                      errorText={errors.email?.message}
                      id="Email"
                      placeholder="Email"
                      label="Email"
                      {...register('email')}
                    />
                    <InputBase
                      errorText={errors.phone?.message}
                      id="PhoneNumber"
                      placeholder="Phone number"
                      label="Phone number"
                      required
                      {...register('phone')}
                    />
                  </InputContainer>
                </div>
              </div>
            </>
          )}
        </Form>
      </div>
    </div>
  );
};

export default memo(NewCompany);
