import { INodeType, INodeTypeDescription } from 'n8n-workflow';

export class CatDev implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Coach Trigger Test',
		name: 'catDev',
		icon: 'file:catdev.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Perform actions with the Coach API',
		defaults: {
			name: 'Coach Trigger Test',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'catDevApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'User',
						value: 'user',
					},
					{
						name: 'Activity',
						value: 'activities',
					},
					{
						name: 'Message',
						value: 'message',
					},
				],
				default: 'user',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['user'],
					},
				},
				options: [
					{
						name: 'Get User Data',
						value: 'getUserData',
						action: 'Get user data ',
						description: 'Get user data in the Coach API',
						routing: {
							request: {
								method: 'POST',
								url: `https://dev.mymatrixapp.com/crmApi/get-user-data`,
								headers: {
									'companyId': '={{$credentials.companyId}}',
									'apiKey': '={{$credentials.apiKey}}',
								},
								body: {
									crm_user_id: '={{$parameter["crmUserId"]}}',
								},
							},
						},
					},
				],
				default: 'getUserData',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['activities'],
					},
				},
				options: [
					{
						name: 'Get Current KPI Value',
						value: 'getCurrentKpiValue',
						action: 'Get current kpi value ',
						routing: {
							request: {
								method: 'POST',
								url: `https://dev.mymatrixapp.com/crmApi/get-current-kpi-value`,
								headers: {
									'companyId': '={{$credentials.companyId}}',
									'apiKey': '={{$credentials.apiKey}}',
								},
								body: {
									user_id: '={{$parameter["userId"]}}',
									activity_id: '={{$parameter["activityId"] || undefined}}',
									activity_date: '={{$parameter["activityDate"] || undefined}}',
								},
							},
						},
					},
					{
						name: 'Get Master Activities List',
						value: 'getMasterActivitiesList',
						action: 'Get master activities list ',
						description: 'Get all activities list for the company in the Coach API',
						routing: {
							request: {
								method: 'POST',
								url: `https://dev.mymatrixapp.com/crmApi/get/master/activities`,
								headers: {
									'companyId': '={{$credentials.companyId}}',
									'apiKey': '={{$credentials.apiKey}}',
								},
								body: {},
							},
						},
					},
					{
						name: 'Get Team Activities List',
						value: 'getTeamActivitiesList',
						action: 'Get team activities list ',
						description: 'Get team activities list in the Coach API',
						routing: {
							request: {
								method: 'POST',
								url: `https://dev.mymatrixapp.com/crmApi/get/team/activities`,
								headers: {
									'companyId': '={{$credentials.companyId}}',
									'apiKey': '={{$credentials.apiKey}}',
								},
								body: {
									team_id: '={{$parameter["teamId"]}}',
								},
							},
						},
					},
					{
						name: 'Get User Activities List',
						value: 'getUserActivitiesList',
						action: 'Get user activities list ',
						description: 'Get user activities list in the Coach API',
						routing: {
							request: {
								method: 'POST',
								url: `https://dev.mymatrixapp.com/crmApi/get/user/activities`,
								headers: {
									'companyId': '={{$credentials.companyId}}',
									'apiKey': '={{$credentials.apiKey}}',
								},
								body: {
									user_id: '={{$parameter["userId"]}}',
								},
							},
						},
					},
					{
						name: 'Update User Current KPI Value',
						value: 'updateUserCurrentKpiValue',
						action: 'Update user current KPI value ',
						routing: {
							request: {
								method: 'PUT',
								url: `https://dev.mymatrixapp.com/crmApi/update-kpi`,
								headers: {
									'companyId': '={{$credentials.companyId}}',
									'apiKey': '={{$credentials.apiKey}}',
								},
								body: {
									kpi_id: '={{$parameter["kpiId"]}}',
									user_id: '={{$parameter["userId"]}}',
									kpi_value: '={{$parameter["kpiValue"]}}',
									kpi_date: '={{$parameter["kpiDate"] || undefined}}',
								},
							},
						},
					},
				],
				default: 'getCurrentKpiValue',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['message'],
					},
				},
				options: [
					{
						name: 'Update Message Translation',
						value: 'updateMessageTranslation',
						action: 'Update message translation ',
						description: 'Update message translation in the Coach API',
						routing: {
							request: {
								method: 'POST',
								url: `https://dev.mymatrixapp.com/crmApi/message/update`,
								headers: {
									'companyId': '={{$credentials.companyId}}',
									'apiKey': '={{$credentials.apiKey}}',
								},
								body: {
									message_id: '={{$parameter["messageId"]}}',
									message_translation: '={{$parameter["messageTranslation"]}}',
									message:'={{$parameter["message"] || undefined}}',
								},
							},
						},
					},
				],
				default: 'updateMessageTranslation',
			},
			{
				displayName: 'CRM User ID',
				name: 'crmUserId',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the CRM user to get data for',
				displayOptions: {
					show: {
						operation: ['getUserData'],
					},
				},
			},
			{
				displayName: 'Team ID',
				name: 'teamId',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the team to get data for',
				displayOptions: {
					show: {
						operation: ['getTeamActivitiesList'],
					},
				},
			},
			{
				displayName: 'User ID',
				name: 'userId',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the user to get data for',
				displayOptions: {
					show: {
						operation: [
							'getUserActivitiesList',
							'getCurrentKpiValue',
							'updateUserCurrentKpiValue',
						],
					},
				},
			},
			{
				displayName: 'Activity Date',
				name: 'activityDate',
				type: 'string',
				default: '',
				description: 'Activity date for getting current KPI data',
				displayOptions: {
					show: {
						operation: ['getCurrentKpiValue'],
					},
				},
			},
			{
				displayName: 'Activity ID',
				name: 'activityId',
				type: 'string',
				default: '',
				description: 'Activity ID for getting current KPI data',
				displayOptions: {
					show: {
						operation: ['getCurrentKpiValue'],
					},
				},
			},
			{
				displayName: 'KPI ID',
				name: 'kpiId',
				type: 'string',
				default: '',
				required: true,
				description: 'KPI ID for update current kpi data',
				displayOptions: {
					show: {
						operation: ['updateUserCurrentKpiValue'],
					},
				},
			},
			{
				displayName: 'KPI Value',
				name: 'kpiValue',
				type: 'string',
				default: '',
				required: true,
				description: 'KPI value for update current kpi data',
				displayOptions: {
					show: {
						operation: ['updateUserCurrentKpiValue'],
					},
				},
			},
			{
				displayName: 'KPI Date',
				name: 'kpiDate',
				type: 'string',
				default: '',
				description: 'KPI date for update current kpi data',
				displayOptions: {
					show: {
						operation: ['updateUserCurrentKpiValue'],
					},
				},
			},
			{
				displayName: 'Message ID',
				name: 'messageId',
				type: 'string',
				default: '',
				required: true,
				description: 'ID of the message to update translation for',
				displayOptions: {
					show: {
						operation: ['updateMessageTranslation'],
					},
				},
			},
			{
				displayName: 'Message Translation',
				name: 'messageTranslation',
				type: 'string',
				default: '',
				required: true,
				description: 'Translation of the message to update',
				displayOptions: {
					show: {
						operation: ['updateMessageTranslation'],
					},
				},
			},
			{
				displayName: 'Message',
				name: 'message',
				type: 'string',
				default: '',
				description: 'Message to update',
				displayOptions: {
					show: {
						operation: ['updateMessageTranslation'],
					},
				},
			},
		],
	};
}
