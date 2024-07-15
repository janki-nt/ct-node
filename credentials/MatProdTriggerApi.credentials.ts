import {
	ICredentialType,
	INodeProperties,
	IAuthenticateGeneric
} from 'n8n-workflow';

export class MatProdTriggerApi implements ICredentialType {
	name = 'matProdTriggerApi';
	displayName = 'Coach Trigger System API';
	properties: INodeProperties[] = [
		{
			displayName: 'Trigger Key',
			name: 'key',
			type: 'string',
			default:'',
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
				'triggerKey': '={{$credentials.key}}'
			},
		},
	};
}
