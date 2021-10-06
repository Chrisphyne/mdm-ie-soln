import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from 'app/entities/policy/policy.reducer';
import { CCard, CCardHeader } from '@coreui/react';

export interface IPolicyUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ name: string }> {}

export const PolicyUpdate = (props: IPolicyUpdateProps) => {
  const [policyId, setPolicyId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.name)

  const { policyEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/policies');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.name);
    }
    }, []);


  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...policyEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };


  return (
    <div>
      <CCard>
        <Row className="justify-content-center">
          <CCardHeader>
            <Col md="8">
              <h2 id="jhipsterSampleApplicationReactApp.bankAccount.home.createOrEditLabel">
                Create or edit a Policy
              </h2>
            </Col>
          </CCardHeader>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : policyEntity} onSubmit={saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="policy-name">
                      Name
                    </Label>
                    <AvInput id="policy-name" type="text" className="form-control" name="name" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nameLabel" for="policy-version">
                    Version
                  </Label>
                  <AvField
                    id="policy-version"
                    type="text"
                    name="version"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="balanceLabel" for="policy-screenCaptureDisabled">
                    screenCaptureDisabled
                  </Label>
                  <AvField
                    id="policy-screenCaptureDisabled"
                    type="text"
                    name="screenCaptureDisabled"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      boolean: { value: true, errorMessage: translate('entity.validation.required') },
                    }}
                  />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/policies" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </CCard>
    </div>

  );



}

const mapStateToProps = (storeState: IRootState) => ({
  policyEntity: storeState.policy.entity,
  loading: storeState.policy.loading,
  updating: storeState.policy.updating,
  updateSuccess: storeState.policy.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PolicyUpdate);
