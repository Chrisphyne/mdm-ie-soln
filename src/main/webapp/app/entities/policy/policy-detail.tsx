import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './policy.reducer'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';

export interface IPolicyDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ name: string }> {}

export const PolicyDetail = (props: IPolicyDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.name);
  }, []);

  const { policyEntity, loading } = props;

  return(
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            Policy Configuration
            <div className="card-header-actions">
              { loading &&
              <div className="sk-wave">
                <div className="sk-wave-rect"></div>
                <div className="sk-wave-rect"></div>
                <div className="sk-wave-rect"></div>
                <div className="sk-wave-rect"></div>
                <div className="sk-wave-rect"></div>
              </div>
              }
              {!loading &&
              "ID: "+/[^/]*$/.exec(policyEntity.name)[0]
              }
            </div>
        </CCardHeader>
          <CCardBody>
            <dl className="jh-entity-details">
          <dt>
            <span id="name">
              KeyguardDisabled
            </span>
          </dt>
          <dd>{policyEntity.keyguardDisabled}</dd>
          <dt>
            <span id="balance">
              StatusBarDisabled
            </span>
          </dt>
          <dd>{policyEntity.statusBarDisabled}</dd>
          <dt>
            Version
          </dt>
          <dd>{policyEntity.version}</dd>
        </dl>
            <Button tag={Link} to="/policies" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
            &nbsp;
            <Button tag={Link} to={`/policies/${/[^/]*$/.exec(policyEntity.name)[0]}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
        </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );

}


const mapStateToProps = ({ policy }: IRootState) => ({
  policyEntity: policy.entity,
  loading: policy.loading,

});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PolicyDetail);
