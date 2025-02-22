import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Select,SelectContent,SelectItem,SelectTrigger, SelectValue } from '@/components/ui/select';
//import { Textarea } from '@/components/ui/textarea';
import React from 'react';

function CommonForm({ formControls, formData, setFormData, onSubmit, buttonText }) {
    const renderInputByComponentType = (controlItem) => {
        const value = formData[controlItem.name] || '';

        switch (controlItem.componentType) {
            case 'input':
                return (
                    <Input
                        name={controlItem.name}
                        placeholder={controlItem.placeholder}
                        id={controlItem.name}
                        type={controlItem.type}
                        value={value}
                        onChange={(e) => setFormData({
                            ...formData,
                            [controlItem.name]: e.target.value
                        })}
                    />
                );

            case 'textarea':
                return (
                    <Textarea
                        name={controlItem.name}
                        placeholder={controlItem.placeholder}
                        id={controlItem.id}
                        value={value}
                        onChange={(e) => setFormData({
                            ...formData,
                            [controlItem.name]: e.target.value
                        })}
                    />
                );
            case "select":
                return (
                    <Select
                        value={formData[controlItem.name] || ""}
                        onValueChange={(selectedValue) =>
                            setFormData({
                                ...formData,
                                [controlItem.name]: selectedValue,
                            })
                        }
                    >
                        <SelectTrigger>
                            <SelectValue placeholder={controlItem.placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="user">User</SelectItem>
                            <SelectItem value = "doctor">Doctor</SelectItem>
                        </SelectContent>
                    </Select>
                );

            default:
                return (
                    <Input
                        name={controlItem.name}
                        placeholder={controlItem.placeholder}
                        id={controlItem.name}
                        type={controlItem.type}
                        value={value}
                        onChange={(e) => setFormData({
                            ...formData,
                            [controlItem.name]: e.target.value
                        })}
                    />
                );
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <div className="flex  w-full flex-col gap-3">
                {formControls.map((controlItem) => (
                    <div className="w-full gap-1.5" key={controlItem.name}>
                        <Label className="mb-1">{controlItem.label}</Label>
                        {renderInputByComponentType(controlItem)}
                    </div>
                ))}
            <button type="submit" className="mt-2 p-2 w-full bg-green-500 hover:bg-green-900">
                {buttonText || 'Submit'}
            </button>
            </div>
        </form>
    );
}
export default CommonForm
