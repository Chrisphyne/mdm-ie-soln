import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './policy.reducer';
import { CCard, CCardBody, CCardHeader, CCol, CRow, CSpinner } from '@coreui/react';

export interface IPolicyProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Policy = (props: IPolicyProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { policyList, match, loading } = props;

  return(
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            Policies
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
            </div>
        </CCardHeader>
          <CCardBody>
            {policyList && policyList.length > 0 ? (
              <table className="table table-hover table-outline mb-0 d-none d-sm-table">
                <thead className="thead-light">
                <tr>
                  <th>
                    Name
                  </th>
                  <th>
                    Version
                  </th>
                  <th>
                    KeyguardDisabled
                  </th>
                  <th>
                    StatusBarDisabled
                  </th>
                  <th />
                </tr>
                </thead>
                <tbody>
                {policyList.map((policy, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                        {/[^/]*$/.exec(policy.name)[0]}
                    </td>
                    <td>{policy.version}</td>
                    <td>{policy.keyguardDisabled}</td>
                    <td>{policy.statusBarDisabled}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${/[^/]*$/.exec(policy.name)[0]}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${/[^/]*$/.exec(policy.name)[0]}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${/[^/]*$/.exec(policy.name)[0]}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" />{' '}
                          <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>
            ) : (
              !loading && (
                <div className="alert alert-warning">
                  No Policies found
                </div>
              )
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )


}


const mapStateToProps = ({ policy }: IRootState) => ({
  policyList: policy.entities,
  loading: policy.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Policy);
