import React from 'react';
import { Translate, translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button, Alert, Col, Row } from 'reactstrap';

import { IRootState } from 'app/shared/reducers';
import { handlePasswordResetInit, reset } from '../password-reset.reducer';
import { CCard, CCardHeader } from '@coreui/react';

export type IPasswordResetInitProps = DispatchProps;

const style = {
  'paddingLeft':'10px',
  'paddingRight':'10px',
  'paddingBottom':'10px'
}

export class PasswordResetInit extends React.Component<IPasswordResetInitProps> {
  componentWillUnmount() {
    this.props.reset();
  }

  handleValidSubmit = (event, values) => {
    this.props.handlePasswordResetInit(values.email);
    event.preventDefault();
  };


  render() {
    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <CCard style={style}>
              <CCardHeader>
                <h1>
                  <Translate contentKey="reset.request.title">Reset your password</Translate>
                </h1>
              </CCardHeader>
            <Alert color="warning">
              <p>
                <Translate contentKey="reset.request.messages.info">Enter the email address you used to register</Translate>
              </p>
            </Alert>
            <AvForm onValidSubmit={this.handleValidSubmit}>
              <AvField
                name="email"
                label={translate('global.form.email.label')}
                placeholder={translate('global.form.email.placeholder')}
                type="email"
                validate={{
                  required: { value: true, errorMessage: translate('global.messages.validate.email.required') },
                  minLength: { value: 5, errorMessage: translate('global.messages.validate.email.minlength') },
                  maxLength: { value: 254, errorMessage: translate('global.messages.validate.email.maxlength') },
                }}
              />
              <Button color="primary" type="submit">
                <Translate contentKey="reset.request.form.button">Reset password</Translate>
              </Button>
            </AvForm>
            </CCard>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapDispatchToProps = { handlePasswordResetInit, reset };

type DispatchProps = typeof mapDispatchToProps;

export default connect(null, mapDispatchToProps)(PasswordResetInit);
