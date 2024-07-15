import {
	IAuthenticateGeneric,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class MatProdApi implements ICredentialType {
	name = 'matProdApi';
	displayName = 'Coach Trigger Company API';
	properties: INodeProperties[] = [
		{
			displayName: 'Company ID',
			name: 'companyId',
			type: 'string',
			default: '',
			required: true,
		},
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			default: '',
			required: true,
			typeOptions: {
				password: true,
			},
		},
	];
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'companyId': '={{$credentials.companyId}}',
				'apiKey': '={{$credentials.apiKey}}',
			},
		},
	};
}
