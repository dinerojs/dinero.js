import { InlineCode } from './InlineCode';
import { Scrollable } from './Scrollable';

type ParametersProps = {
  children: React.ReactNode;
};

function isReactElement(element: React.ReactNode): element is React.ReactElement {
  return (element as React.ReactElement).hasOwnProperty('props');
}

export function Parameters({ children }: ParametersProps) {
  const items = Array.isArray(children) ? children : [children];
  const parameters = items.filter((child: React.ReactNode): child is React.ReactElement => {
    return isReactElement(child) && child.props.mdxType === 'Parameter';
  });

  if (parameters.length > 0) {
    return (
      <Scrollable>
        <table className="w-full mt-3">
          <thead>
            <tr>
              <th className="px-0 py-4 text-sm font-semibold text-left text-gray-400">
                <span className="pr-8 whitespace-nowrap">Name</span>
              </th>
              <th className="px-0 py-4 text-sm font-semibold text-left text-gray-400">
                <span className="pr-8 whitespace-nowrap">Type</span>
              </th>
              <th className="px-0 py-4 text-sm font-semibold text-left text-gray-400">
                <span className="pr-8 whitespace-nowrap">Description</span>
              </th>
              <th className="px-0 py-4 text-sm font-semibold text-left text-gray-400">
                <span className="pr-8 whitespace-nowrap">Required</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {parameters.map(({ props }) => (
              <tr key={props.name}>
                <td className="px-0 py-4 text-sm align-top border-t border-gray-200">
                  <InlineCode id={`parameter-${props.name}`}>{props.name}</InlineCode>
                </td>
                <td className="px-0 py-4 text-sm align-top border-t border-gray-200">
                  <InlineCode>{props.type}</InlineCode>
                </td>
                <td className="px-0 py-4 align-top border-t border-gray-200">
                  <div className="-mt-6">
                    {props.children}
                  </div>
                </td>
                <td className="px-0 py-4 align-top border-t border-gray-200">
                  {props.required ? 'Yes' : 'No'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Scrollable>
    );
  }

  return null;
}

type ParameterProps = {
  children: React.ReactNode;
  name: string;
  type: string;
  required: boolean;
};

export function Parameter({ children }: ParameterProps) {
  return children;
}
