import {
	ICredentialType,
	INodeProperties,
	IAuthenticateGeneric
} from 'n8n-workflow';

export class CatDevTriggerApi implements ICredentialType {
	name = 'catDevTriggerApi';
	displayName = 'Coach Trigger Test System API';
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
